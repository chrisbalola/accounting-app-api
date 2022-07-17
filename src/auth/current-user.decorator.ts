import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const CurrentUser = createParamDecorator((data, context: ExecutionContext)  => {
    return context.getArgByIndex(0).user;
});