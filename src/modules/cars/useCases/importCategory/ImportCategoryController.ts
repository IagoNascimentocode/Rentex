import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { Request, Response } from "express";

class ImportCategoryController {

    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

    handle(request: Request, response: Response): Response {
        const { file } = request;
        console.log(file);

        this.importCategoryUseCase.execute(file);

        return response.send()
    }
}

export { ImportCategoryController }