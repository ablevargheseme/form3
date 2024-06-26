import connectMongoose from "../../lib/mongo/index.js";
import eventModel from "../../lib/mongo/models/event/index.js";

export async function POST(request) {
    try {
        const data = await request.json();
        const {
            address,
            appletName,
            appletDescription,
            ownershipContractAddress,
            actionValue,
            triggerBlockchain,
            triggerType,
            service,
            actionType,
        } = data;
        console.log("data", data);

        await connectMongoose();

        // Create a new document using the model
        await eventModel.create({
            address,
            appletName,
            appletDescription,
            ownershipContractAddress,
            actionValue,
            triggerBlockchain: triggerBlockchain[0],
            triggerType: triggerType[0],
            service: service[0],
            actionType: actionType[0],
        });
        console.log("event created");

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // Handle any errors
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(request) {
    try {

        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const address = searchParams.get("address");
        await connectMongoose();

        const documents = await eventModel.find({
            address: address,
        });

        return new Response(JSON.stringify(documents), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // Handle any errors
        console.log("error", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// export  async function handler(req, res) {
//     if (req.method === "POST") {
//         try {

//             const {
//                 address,
//                 appletName,
//                 appletDescription,
//                 ownershipContractAddress,
//                 actionValue,
//                 triggerBlockchain,
//                 triggerType,
//                 service,
//                 actionType,
//             } = req.body;
//             console.log("kk", req.body)

//             // await connectMongoose();

//             // Create a new document using the model
//             const newDocument = await eventModel.create({
//                 address,
//                 appletName,
//                 appletDescription,
//                 ownershipContractAddress,
//                 actionValue,
//                 triggerBlockchain: triggerBlockchain[0],
//                 triggerType: triggerType[0],
//                 service: service[0],
//                 actionType: actionType[0]
//             });

//             // Save the new document to the database
//             // await newDocument.create();
//             // console.log("documentid", newDocument._id);
//             // Respond with success message
//             res.status(201).json({ documentid: newDocument._id });
//         } catch (error) {
//             // Handle any errors
//             console.log("error", error)
//             res.status(500).json({ error: "Failed to create document" });
//         }
//     }
//     else if (req.method === "GET") {
//         try {
//             const { address } = req.query;
//             await connectMongoose();

//             // Create a new document using the model
//             const documents = await eventModel.find({

//             });

//             // Save the new document to the database
//             // await newDocument.create();

//             // Respond with success message
//             res.status(201).json({ documents: documents });
//         } catch (error) {
//             // Handle any errors
//             console.log("error", error)
//             res.status(500).json({ error: "Failed to create document" });
//         }
//     } else {
//         res.status(405).json({ error: "Method Not Allowed" });
//     }
// }
