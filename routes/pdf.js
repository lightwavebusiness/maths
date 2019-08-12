var express = require('express');
var router = express.Router();
var PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');
var pdfFiller   = require('pdffiller');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var doc = new PDFDocument();
var stream = doc.pipe(blobStream());
var lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aperiam accusantium quaerat possimus laboriosam quas consectetur rem. Quae, unde quibusdam. Nemo enim nisi odio consequatur! Officia magnam odio eligendi asperiores?";

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
  .scale(0.6)
  .translate(470, 130)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
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





//stream.pipe(res);


});

router.get('/buildHomework', function(req, res, next){
    var inFile = req.query.infile
    var outFile = req.query.outfile

    if(
        inFile===undefined ||
        outFile===undefined ||
        req.body===undefined || 
        req.body===null) {
        res.render("error", { message : "Parameter Error"})

    } else {
//console.log(req.body)

    var data = req.body
    
    // { 
    //     'Student Name': 'Alejandro Chaffey',
    // 'Date Set': '10/08/2019',
    // 'Date Due': '16/08/2019 ',
    // 'NoRow1': '1',
    // 'HomeworkRow1': 'Test 1',
    // 'NoRow2': '2',
    // 'HomeworkRow2': 'Test 2',
    // 'NoRow3': '3',
    // 'HomeworkRow3': 'Test 3',
    // 'NoRow4': '4',
    // 'HomeworkRow4': '4',
    // 'NoRow5': '5',
    // 'HomeworkRow5': '5',
    // 'NoRow6': '6',
    // 'HomeworkRow6': '6',
    // 'NoRow7': '7',
    // 'HomeworkRow7': '7',
    // 'Parent Feedback': 'Hello',
    // 'Homework Feedback': 'Goodbye',
    // 'undefined_7': '',
    // 'undefined_8': '',
    // 'undefined_9': '',
    // 'undefined_10': '',
    // 'undefined_11': '',
    // 'undefined_12': '',
    // 'undefined_13': '*',
    // 'readingDate': '24/5',
    // 'readingDate2': '25/5',
    // 'readingDate3': '26/5',
    // 'readingDate4': '27/5',
    // 'readingDate5': '28/5',
    // 'readingDate6': '29/5',
    // 'readingDate7': '30/5',
    // 'readingDate8': '31/5',
    // 'readingDate9': '01/06' }
  
    var sourcePDF = `templates/${inFile}`;
    var destinationPDF =  `pdfs/${outFile}`; //test_complete.pdf";

     
    pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, function(err) {
        if (err) throw err;
        console.log("In callback (we're done)."); 
    });

    //res.render('buildHomework', {title : 'Homework Builder', schema : "We do have one"});

}
});

router.get("/export/:file", (req, res, next) => {
    try {
        var path = `./pdfs/${req.params.file}.pdf`;
        var file = fs.createReadStream(path);
        var stat = fs.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.file}.pdf`);
        file.pipe(res);
    } catch (err) {
        res.render("error", err);
    }
})


router.get('/fill', function(req, res, next) {
    var sourcePDF = "pdfs/homework.pdf";
 
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