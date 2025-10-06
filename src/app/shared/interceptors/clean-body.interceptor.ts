import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function cleanBodyInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const methodsWithBody = ['POST', 'PATCH', 'PUT'];

  if (methodsWithBody.includes(req.method) && req.body) {
    const cleanedBody = cleanObject(req.body);

    req = req.clone({
      body: cleanedBody,
    });
  }

  return next(req);
}

function cleanObject(obj: any): any {
  if (obj === null || obj === undefined) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    const cleanedArray = obj.map((item) => cleanObject(item)).filter((item) => item !== undefined);

    return cleanedArray.length === 0 ? undefined : cleanedArray;
  }

  if (typeof obj === 'object' && obj !== null) {
    const cleanedObj: any = {};
    let hasProperties = false;

    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = cleanObject(value);

      if (cleanedValue !== undefined) {
        cleanedObj[key] = cleanedValue;
        hasProperties = true;
      }
    }

    return hasProperties ? cleanedObj : undefined;
  }

  if (typeof obj === 'string' && obj.trim() === '') {
    return undefined;
  }

  return obj;
}
