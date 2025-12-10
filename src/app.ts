import type {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
} from "fastify";

export default async function serviceApp(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
) {
  fastify.setErrorHandler((err: FastifyError, request, reply) => {
    fastify.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      "Unhandled error ocurred",
    );

    reply.code(err.statusCode ?? 500);

    let message = "Internal server error";
    if (err.statusCode && err.statusCode < 500) {
      message = err.message;
    }

    return { message };
  });
}
