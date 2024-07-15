const axios = require('axios');

exports.handler = async (event) => {
    if (!event.Records || event.Records.length === 0) {
        console.log("No records found");
        return;
    }

    for (const record of event.Records) {
        try {
            const messageBody = JSON.parse(record.body);
            const idSqs = messageBody.id;
            const valorTotalSqs = messageBody.valorTotal;

            if (!idSqs || !valorTotalSqs) {
                console.log("Attribute not found in message body");
                continue;
            }

            const response = await axios.post('http://a510a9de72f064953aaf7628714fffa0-1431959075.us-east-1.elb.amazonaws.com:8082/pagamentos', {
                id: idSqs,
                valorTotal: valorTotalSqs
            });

            console.log(`Status Code: ${response.status}`);
            console.log(`Response Data: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error(`Error processing record: ${error}`);
        }
    }
};
