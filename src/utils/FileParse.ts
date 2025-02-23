// THIS DOES NOT WORK


// import mammoth from 'mammoth';
// import * as pdfjsLib from 'pdfjs-dist';

// // Set up pdf.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// export async function parseFile(file: File): Promise<string[]> {
//   const fileType = file.name.split('.').pop()?.toLowerCase();

//   try {
//     switch (fileType) {
//       case 'txt':
//         const text = await file.text();
//         return text.split('\n').map(line => line.trim()).filter(Boolean);

//       case 'docx':
//         const arrayBuffer = await file.arrayBuffer();
//         const result = await mammoth.extractRawText({ arrayBuffer });
//         return result.value.split('\n').map(line => line.trim()).filter(Boolean);

//       case 'pdf':
//         const pdfData = await file.arrayBuffer();
//         const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//         const textContent: string[] = [];
        
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           const text = content.items
//             .map((item: any) => item.str)
//             .join('\n');
//           textContent.push(...text.split('\n').map(line => line.trim()).filter(Boolean));
//         }
//         return textContent;

//       default:
//         throw new Error(`Unsupported file type: ${fileType}`);
//     }
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     throw new Error(`Error parsing file: ${message}`);
//   }
// }