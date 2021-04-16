const app = require("fastify")()

app.get("/", async (request, reply) => {
  reply.send({ message: "Hello der CapraCon!" })
})

app.listen(80, "0.0.0.0").then(() => {
  console.log("Server running at http://localhost:80/")
})
