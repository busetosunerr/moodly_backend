import app from "./src/app";

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
