import {
  Controller,
  Get,
  Param,
  Res,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Express } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

// const fileFilter = (req, file, cb) => {
//   console.log(file.mimetype);
//   if (
//     file.mimetype.split('/')[1] === 'jpeg' ||
//     file.mimetype.split('/')[1] === 'png' ||
//     file.mimetype.split('/')[1] === 'jpg'
//   ) {
//   return cb(null, {});
//   }
//   return cb(new Error('File không đúng định dạng'), false);
// };

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

@Controller('images')
@ApiTags('images')
export class ImagesController {
  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    // Kiểm tra xem tên file có chứa .. hay không
    if (filename.includes('..')) {
      throw new Error('Tên file không hợp lệ');
    }

    const fileExtension = path.extname(filename).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Thêm các định dạng mở rộng khác nếu cần

    const isValidExtension = allowedExtensions.some((ext) =>
      fileExtension.endsWith(ext),
    );
    if (!isValidExtension) {
      throw new Error('Định dạng file không hỗ trợ');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    console.log(filePath);

    try {
      const exists = await fs.pathExists(filePath);
      if (!exists) {
        throw new Error('Không tìm thấy ảnh');
      }

      res.sendFile(filePath);
    } catch (error) {
      // Xử lý lỗi
      throw new Error('Không thể lấy ảnh');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file',  storage ))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}