// Get your free API Key at: https://www.docubee.com/solutions/integrations/docubee-api
// Full Docubee API Documentation: https://docs.docubee.app/#overview
import { createReadStream } from 'fs';

const docubeeUrl = 'https://docubee.app/api/v2';

const apiToken = process.env.YOUR_API_TOKEN || "YOUR_API_TOKEN";

if (apiToken === "YOUR_API_TOKEN") {
    console.log('Error - Invalid token: Please set you API token environment variable.');
    process.exit(1);
}

const uploadDocument = async (pathToFile) => {
    console.log('Uploading source document...');
    const response = await fetch(`${docubeeUrl}/documents`, {
        body: createReadStream(pathToFile),
        headers: {
            Authorization: apiToken,
            'Content-Type': 'application/pdf',
        },
        method: 'POST',
        duplex: 'half'
    });
    const { documentId } = await response.json();
    console.log(`The source document has been uploaded (documentId: ${documentId}).`);
    return documentId;
}

const placeFieldsOnDocument = async (inputDocumentId) => {
    console.log('Placing fields on the document...');
    const response = await fetch(`${docubeeUrl}/documents/${inputDocumentId}/fields`, {
        body: JSON.stringify({
            fields: [
                {
                    anchorString: '#checkbox#',
                    name: 'TestCheckbox',
                    removeAnchorString: true,
                    required: true,
                    type: 'checkbox'
                },
                {
                    anchorString: '#date#',
                    name: 'TestDate',
                    removeAnchorString: true,
                    required: true,
                    type: 'date'
                },
                {
                    anchorString: '#initials#',
                    name: 'TestInitials',
                    removeAnchorString: true,
                    required: true,
                    type: 'initials'
                },
                {
                    anchorString: '#signature#',
                    name: 'TestSignature',
                    removeAnchorString: true,
                    required: true,
                    type: 'signature'
                }
            ]
        }),
        headers: {
            Authorization: apiToken,
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });

    const { documentId } = await response.json();
    console.log(`Fields placed successfully (documentId: ${documentId}).`);
    return documentId;
}

(async () => {
    const inputDocId = await uploadDocument('./documents/fields-doc.pdf');
    placeFieldsOnDocument(inputDocId);
})();
