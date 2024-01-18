import { ArrayItemType } from '@/types/arrayToTree'

function createOkHttpTemplate(
  url: string,
  method: ArrayItemType,
  headers: any,
  _redirect?: string,
): string {
  return `
        OkHttpClient client = new OkHttpClient().newBuilder()
            .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "<body data here>");
        Request request = new Request.Builder()
            .url("${url}")
            .method("${method}", body)
            .addHeader(${headers})
            .addHeader("Content-Type", "application/json")
            .build();
        Response response = client.newCall(request).execute();
    `
}

export { createOkHttpTemplate }
