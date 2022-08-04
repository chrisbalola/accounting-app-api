import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! It\'s me your friend: @chrisbalola. Wink!';
  }
}
