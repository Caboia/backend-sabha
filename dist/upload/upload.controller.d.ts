/// <reference types="multer" />
export declare class UploadController {
    uploadFile(file: Express.Multer.File): Promise<{
        originalName: string;
        filename: string;
        path: string;
        size: number;
        url: string;
    }>;
}
