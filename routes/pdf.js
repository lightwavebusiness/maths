var express = require('express');
var router = express.Router();
var PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');
var pdfFiller   = require('pdffiller-stream');
var fs = require('fs');
var path = require('path')

/* GET users listing. */
router.get('/', function(req, res, next) {
    var doc = new PDFDocument();
var stream = doc.pipe(blobStream());
var lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?";


doc
  .scale(1)
  .translate(30, 0)
  .path('M222.77 104.2C247.29 102.33 263.65 104.19 271.84 109.77C325.21 146.14 395.95 143.89 446.9 104.2C446.9 104.2 446.9 104.2 446.9 104.2C490.23 125.53 517.31 138.86 528.15 144.19C558.96 159.36 595 136.93 595 102.59C595 88.91 595 54.71 595 0L0 0C65.48 75.8 139.74 110.53 222.77 104.2Z')
  .fill('black', 'even-odd')
  .restore();

  doc
  .scale(1)
  .translate(5, -5)
  .path('M222.77 104.2C247.29 102.33 263.65 104.19 271.84 109.77C325.21 146.14 395.95 143.89 446.9 104.2C446.9 104.2 446.9 104.2 446.9 104.2C490.23 125.53 517.31 138.86 528.15 144.19C558.96 159.36 595 136.93 595 102.59C595 88.91 595 54.71 595 0L0 0C65.48 75.8 139.74 110.53 222.77 104.2Z')
  .fill('yellow', 'even-odd')
  .restore();


// draw some text
doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

// some vector graphics
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

doc.circle(280, 200, 50).fill('#6600FF');

// an SVG path
doc
  .scale(1)
  .translate(0, 0)
  .path('M222.77 104.2C247.29 102.33 263.65 104.19 271.84 109.77C325.21 146.14 395.95 143.89 446.9 104.2C446.9 104.2 446.9 104.2 446.9 104.2C490.23 125.53 517.31 138.86 528.15 144.19C558.96 159.36 595 136.93 595 102.59C595 88.91 595 54.71 595 0L0 0C65.48 75.8 139.74 110.53 222.77 104.2Z')
  .fill('yellow', 'even-odd')
  .restore();

// and some justified text wrapped into columns
doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
  .text(lorem, {
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 3,
    height: 350,
    ellipsis: true
  });

// end and display the document in the iframe to the right
var filename = "WhateverFilenameYouWant.pdf"; 
// Be careful of special characters

filename = encodeRFC5987ValueChars(filename);
// Ideally this should strip them

res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
res.setHeader('Content-type', 'application/pdf');

doc.pipe(res)


doc.end();

});

router.get('/buildHomework/:template', function(req, res, next){
    var inFile = `${req.params.template}.pdf`
    var outFile = `${req.params.template}_out.pdf`

    if(
        inFile===undefined ||
        outFile===undefined ||
        req.body===undefined || 
        req.body===null) {
        res.render("error", { message : "Parameter Error"})

    } else {


    var data = { 
        'Student Name': 'Alejandro Chaffey',
    'Date Set': '10/08/2019',
    'Date Due': '16/08/2019 ',
    'NoRow1': '1',
    'HomeworkRow1': 'Test 1',
    'NoRow2': '2',
    'HomeworkRow2': 'Test 2',
    'NoRow3': '3',
    'HomeworkRow3': 'Test 3',
    'NoRow4': '4',
    'HomeworkRow4': '4',
    'NoRow5': '5',
    'HomeworkRow5': '5',
    'NoRow6': '6',
    'HomeworkRow6': '6',
    'NoRow7': '7',
    'HomeworkRow7': '7',
    'Parent Feedback': 'Hello',
    'Homework Feedback': 'Some instructions',
    'undefined_7': '',
    'undefined_8': '',
    'undefined_9': '',
    'undefined_10': '',
    'undefined_11': '',
    'undefined_12': '',
    'undefined_13': '*',
    'readingDate': '24/5',
    'readingDate2': '25/5',
    'readingDate3': '26/5',
    'readingDate4': '27/5',
    'readingDate5': '28/5',
    'readingDate6': '29/5',
    'readingDate7': '30/5',
    'readingDate8': '31/5',
    'readingDate9': '01/06' }
  console.log(data)
    var sourcePDF = `templates/${inFile}`;
    var destinationPDF =  `pdfs/${outFile}`; //test_complete.pdf";

    //Create a file copy
    // pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, true, function(err) {
    //     if (err) throw err;
    //     console.log("In callback (we're done)."); 
    // });

    //Create and force download
    pdfFiller.fillForm(sourcePDF, data)
        .then((outputStream) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${outFile}.pdf`);
            outputStream.pipe(res);
        }).catch((err) => {
            console.log(err);
        });

    //res.render('buildHomework', {title : 'Homework Builder', schema : "We do have one"});

    }
});


//Route forces the pdf to be saved 
router.get("/export/:file", (req, res, next) => {
    try {
        var _path = `./pdfs/${req.params.file}.pdf`;
        var file = fs.createReadStream(_path);
        var stat = fs.statSync(_path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.file}.pdf`);
        file.pipe(res);
    } catch (err) {
        res.render("error", err);
    }
})

//Route will show output  within browser window. 
router.get("/read/:file", (req, res, next) => {
    try {
        var _path = path.join(__dirname, `../pdfs/${req.params.file}.pdf`);
        console.log(_path)
        var data =fs.readFileSync(_path);
        res.contentType("application/pdf");
        res.send(data);
    } catch (err) {
        res.render("error", err)
    }
})


router.get('/fill', function(req, res, next) {
    var sourcePDF = "templates/homework.pdf";
 
    // Override the default field name regex. Default: /FieldName: ([^\n]*)/
    var nameRegex = null;  
     
    var FDF_data = pdfFiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
        if (err) throw err;
        console.log(fdfData);
    });

});


function encodeRFC5987ValueChars (str) {
    return encodeURIComponent(str).
        // Note that although RFC3986 reserves "!", RFC5987 does not,
        // so we do not need to escape it
        replace(/['()]/g, escape). // i.e., %27 %28 %29
        replace(/\*/g, '%2A').
            // The following are not required for percent-encoding per RFC5987, 
            // so we can allow for a little better readability over the wire: |`^
            replace(/%(?:7C|60|5E)/g, unescape);
}


module.exports = router;