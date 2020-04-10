using DAL.Entities;
using HazardTrackerServer.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.Repositories.Interfaces;
using QRCoder;
using System.Drawing;
using static QRCoder.PayloadGenerator;
using System;
using PdfSharp.Pdf;
using PdfSharp.Drawing;
using System.IO;
using System.Drawing.Imaging;

namespace HazardTrackerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;

        public LocationController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<LocationEntity> GetById(int id)
        {
            var location = _locationRepository.GetById(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public IActionResult Post([FromBody]LocationDto locationDto)
        {
            var location = new LocationEntity
            {
                Name = locationDto.Name,
                Address = locationDto.Address
            };
            _locationRepository.Create(location);

            return CreatedAtAction(nameof(GetById), new { id = location.Id }, location);
        }

        [HttpGet("generate")]
        public IActionResult GeneratePdf(int id)
        {
            string payload = id.ToString();
            Bitmap qrCodeBitmap = GenerateQRCode(payload);
            
            PdfDocument pdf = GeneratePdf(qrCodeBitmap);
            MemoryStream stream = new MemoryStream();
            pdf.Save(stream);
            return File(stream, System.Net.Mime.MediaTypeNames.Application.Pdf);
        }

        private Bitmap GenerateQRCode(string payload)
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(payload, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            return qrCode.GetGraphic(20);
        }

        private PdfDocument GeneratePdf(Bitmap qrCodeImage)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            PdfDocument document = new PdfDocument();
            document.Info.Title = "QR Code";
            PdfPage page = document.AddPage();

            XGraphics gfx = XGraphics.FromPdfPage(page);
            XFont font = new XFont("Verdana", 45, XFontStyle.Bold);
            gfx.DrawString("Scan QR Code", font, XBrushes.Black,
                new XRect(0, 0, page.Width, page.Height),
                XStringFormats.TopCenter);

            using (MemoryStream stream = new MemoryStream())
            {
                qrCodeImage.Save(stream, ImageFormat.Bmp);
                XImage image = XImage.FromStream(stream);

                gfx.DrawImage(image, 87, 60);
            }

            return document;
        }
    }
}