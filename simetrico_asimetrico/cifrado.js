$(document).ready(function () {
  privateKey = "-----BEGIN RSA PRIVATE KEY-----" +
  "MIICWwIBAAKBgQDG5Ui/jsHUGx83704WWvdmyLv1nF64FT7jGaaPe1N2e6i0fCsI" +
  "/ss+yPU4zMZPO9drMathA9GPSPUpl98+Aj00n919Q3kBPn7cXQGv/ENnExD3SwoT" +
  "uSxI6hPeIHSAWWsQKs8qsU2It6ofPg0fLE/G0AozRl4MTgT/L+1J552sIQIDAQAB" +
  "AoGAcN9d0ZfqV7ysksmzvuwQyrvQLyp2dnFYJvk/lN2gF/VFYGe25Hv0S8UvpPRQ" +
  "9lY3ghXF9GB+ZJo6x0fw4PfUUy7z7kiJ5a2mwr0+mGlZoTmsOy0tmd9usOy9reda" +
  "havDYJmN8odLKU37Yj8THR9h/xacX/SnM70lHbwLPZbbBgECQQD/VIqtqz4q7mwg" +
  "d6hbATajBx9xQbLrAHP/kBMf3r02bhSLGrQDRgCwG11v2jhW6epOr9k4FgC1wVIW" +
  "ou7fvAaJAkEAx2rYgiTjWRTeVxJVU+6xKIaWpLGymSOf3UDs1T7VilbR572hpmQl" +
  "yNxXyYlTZ+DjcHqhTbkJhwXfa7eKGPKS2QJAbWAfz+ltRiLAOuBHRESuzQN+GpwU" +
  "MssM5csoBhz6XNinADe+KTDRlp8CVanbPJATiQWXPYlfYHyh14SQY1M+UQJABDrB" +
  "6NC7ebI1nQcohCU14LQqEcgrD5Bv3ZN48nTotoxs20tsWEkbfA0gV4fwGu3sJQCU" +
  "1z8rco+vU2uLJEhQ0QJASRc/fl9BLZGpXEaXOTAKnAlS9EEDjHn7huJ2qdBaSoEa" +
  "XPXyllHFnzYhwFjUTFvJWo7+fCOhqw3Nq6dj4uGxMg==" +
  "-----END RSA PRIVATE KEY-----";
  /*publicKey = "-----BEGIN PUBLIC KEY-----" +
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDG5Ui/jsHUGx83704WWvdmyLv1" +
  "nF64FT7jGaaPe1N2e6i0fCsI/ss+yPU4zMZPO9drMathA9GPSPUpl98+Aj00n919" +
  "Q3kBPn7cXQGv/ENnExD3SwoTuSxI6hPeIHSAWWsQKs8qsU2It6ofPg0fLE/G0Aoz" +
  "Rl4MTgT/L+1J552sIQIDAQAB" +
  "-----END PUBLIC KEY-----";
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  var encryptedPass = encrypt.encrypt("myPassword");
  $("#clave").text(encryptedPass);*/




  //Al cargar la página recuperamos el listado de clientes
  $.getJSON("http://localhost:8080/v1/user",
      function (data) {
          //Por cada uno creamos una fila de HTML
          $.each(data, function (key, val) {
              var fila = "<tr><td>" + val.Username + "</td><td><a href='#' onclick='cargarDetalle(event,\"" + val.Id + "\");'>Ver Detalle</a></td></tr>";
              //Añadimos la fila a la tabla
              $(fila).appendTo("#tablaClientes");
          });
      }
      );

});
function cargarDetalle(event,id) {
    var myPassword = "myPassword";

    event.preventDefault();
    var urlDetalle = "http://localhost:8080/v1/user/" + id;
    $.getJSON(urlDetalle, function (data) {
        //decifrar la clave compartida
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        var uncryptedPass = decrypt.decrypt($("#passEncrypted").text());
        //decifrar la clave del cliente
        var decrypted = CryptoJS.AES.decrypt(data.Password, uncryptedPass);
        var detalle = "<b>Id: </b>" + data.Id + "<br/>";
        var detalle = detalle + "<b>Usuario: </b>" + data.Username + "<br/>";
        var detalle = detalle + "<b>Clave: </b>" + decrypted.toString(CryptoJS.enc.Utf8) + "<br/>";
        var detalle = detalle + "<b>Genero: </b>" + data.Profile.Gender + "<br/>";
        var detalle = detalle + "<b>Edad: </b>" + data.Profile.Age + "<br/>";
        var detalle = detalle + "<b>Dirección: </b>" + data.Profile.Address + "<br/>";
        var detalle = detalle + "<b>Email: </b>" + data.Profile.Email + "<br/>";
        $("#detalleClientes").html(detalle);

    });
}
