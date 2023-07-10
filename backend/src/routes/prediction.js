import express from "express";
import { PythonShell } from 'python-shell';

const router = express.Router();
router.post("/", async (req, res) => {
	console.log(req.body);

	let options = {
		mode: 'text',
		args: req.body
	}
	PythonShell.run('src/python/predictor.py', options)
		.then(messages => {
			console.log(messages[0])
			return res.status(200).json(messages[0]);
		})
		.catch(err => {
			console.error('Python script execution error:', err);
			return res.status(500).json({ error: 'An error occurred during script execution.' });
		});
})
export { router as predictionRouter };
