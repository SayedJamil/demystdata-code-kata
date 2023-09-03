import {Request, Response} from "express";

export class InitController {
    initApplication = async (req: Request, res: Response) => {
        // The response is very fast and I want you to see the animation here... :)
        await new Promise(res => setTimeout(res, 500))
        res.json({msg: "Init complete"})
    }
}

export default new InitController()