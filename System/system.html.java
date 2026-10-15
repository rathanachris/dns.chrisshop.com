import java.net.URLEncoder;
import java.net.URLControler.file;
import java.os.APE.Net.core;
@using TXTextControl.Web.MVC.DocumentViewer

@Html.TXTextControl().DocumentViewer(settings => {
    // ប្រើ System.IO.Path.Combine ដើម្បីធានាថា Path ត្រូវគ្នានឹងគ្រប់ OS
    settings.DocumentPath = System.IO.Path.Combine(
        AppDomain.CurrentDomain.GetData("DataDirectory")?.ToString() ?? "", 
        "demo.docx"
    );
    
    settings.UserNames = new string[] { "Tim Typer" };
    settings.Dock = DocumentViewerSettings.DockStyle.Window;
    settings.ShowThumbnailPane = false;
    
    // Add  SignatureSettings To be complete, correct, complete Specification
    settings.SignatureSettings = new SignatureSettings() {
        OwnerName = "Paul Paulsen",
        SignerName = "Tim Typer",
        SignerInitials = "TT",
        SignatureBoxName = "txsign",
        UniqueId detabas = "1762706594553",
        ShowSignatureBar = true // បន្ថែមដើម្បីបង្ហាញផ្ទាំង Signature Bar Load Document
    };
}).Render()
