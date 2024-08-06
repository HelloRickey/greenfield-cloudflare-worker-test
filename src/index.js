/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
const {
	Client,
	VisibilityType
  } = require("@bnb-chain/greenfield-js-sdk");
export default {
	async fetch(request, env, ctx) {

		

		const formData = await request.formData();
		const file = formData.get('file');
		const fileBuffer = await file.arrayBuffer();
		const fileName = file.name;
		const fileType = file.type;
		const fileSize = file.size;



		const client = Client.create("https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org","5600");
		const response = await client.object.delegateUploadObject(
			{
			  bucketName: "newcontents",
			  objectName: fileName,
			  body: {
				name: fileName,
				type: fileType,
				size: fileSize,
				content: fileBuffer,
			  },
			  delegatedOpts: {
				visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
			  },
			},
			{
			  type: "ECDSA",
			  privateKey: "",
			}
		  );	

		  console.log("response",response)

		return new Response('Hello World2!');
	},
};
