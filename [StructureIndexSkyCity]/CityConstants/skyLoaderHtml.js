export const skyLoaderHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;

}

.loader4{
  position: absolute;
  width: 150px;
  height: 20px;
  top: calc(50% - 10px);
  left: calc(50% - 75px);
  background-color: rgba(255,255,255,0.2);
}

.loader4:before{
  content: "";
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0;
  height: 20px;
  width: 0;
  opacity: 1;
  transform-origin: 100% 0%;
  animation: loader4 10s ease-in-out infinite;
}

.loader4:after{
  content: "LOADING ...";
  color: #fff;
  font-family: Lato, "Helvetica Neue", Arial;
  font-weight: 200;
  font-size: 16px;
  position: absolute;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  left: 0;
  top: 0;
}

@keyframes loader4 {
  0% { width: 0; }
  70% { width: 100%; opacity: 1; }
  90% { width: 100%; opacity: 0; }
  100% { width: 0; opacity: 0; }
}
</style>
</head>
<body>
  <div class="loader4"></div>
</body>
</html>
`;
