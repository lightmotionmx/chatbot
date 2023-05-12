// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
var hamburguesas_pedidas = [];
var aceptado = "inicio";
var usuario = "";
venom
  .create({
    session: 'session-name', //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  const buttons = [
    {
      "buttonText": {
        "displayText": "Relizar un pedido"
        }
      },
    {
      "buttonText": {
        "displayText": "Ver el menú"
        }
      },
      {
        "buttonText": {
          "displayText": "Hablar con alguien"
          }
        }
    ]

    const burgers = [
        {
          "buttonText": {
            "displayText": "Hamburguesa 1 - $100"
            }
          },
        {
          "buttonText": {
            "displayText": "Hamburguesa 2 - $200"
            }
          },
          {
            "buttonText": {
              "displayText": "Hamburguesa 3 - $300"
              }
            },
            {
              "buttonText": {
                "displayText": "Finalizar pedido"
                }
              }
        ]

        const sino = [
            {
              "buttonText": {
                "displayText": "Si"
                }
              },
            {
              "buttonText": {
                "displayText": "No"
                }
              }
            ]

function start(client) {
  client.onMessage((message) => {
    if (message.isGroupMsg === false && aceptado === "inicio") {
        aceptado = "procesando"
        client.getContact(message.from)
            .then((contact) => {
            usuario = contact.name;
            console.log(contact.name);

            client.sendButtons(message.from, `Que deseas hacer ${usuario}?`, buttons, 'Selecciona una opción por favor.')
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            })
            .catch((err) => {
            console.error(err);
            });

          
      }


      if (message.body === 'Si' && message.isGroupMsg === false && aceptado === "procesando") {
        aceptado = "aceptado";
        client
        .sendText(message.from, `A nombre de quien hacemos el pedido?`)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }

      if (message.body != 'Si' && message.isGroupMsg === false && aceptado === "aceptado") {
        aceptado = "nombre";
        client
        .sendText(message.from, `Gracias por elegirnos, ${message.body}, estamos preparando tu pedido`)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
          client
          .sendText("524428245028@c.us", `Un pedido ha sido generado`)
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
      }



      if (message.body === 'Relizar un pedido' && message.isGroupMsg === false && aceptado === "procesando") {
        client
            .sendButtons(message.from, 'Selecciona una hamburguesa', burgers, 'Selecciona una opción por favor.')
            .then((result) => {
            console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
            });
        }

        if (message.body === 'Finalizar pedido' && message.isGroupMsg === false && aceptado === "procesando") {
            let recuentoHamburguesas = {};
            let total = 0;
        
            hamburguesas_pedidas.forEach(hamburguesa => {
                if (recuentoHamburguesas[hamburguesa]) {
                    recuentoHamburguesas[hamburguesa]++;
                } else {
                    recuentoHamburguesas[hamburguesa] = 1;
                }
                total += Number(hamburguesa.split('$')[1]);
            });
        
            let pedido = Object.entries(recuentoHamburguesas)
              .map(([hamburguesa, count]) => `${hamburguesa} x ${count}`)
              .join('\n');
        
            client
              .sendText(message.from, `Pedido:\n\n${pedido}\n\nTotal: $${total}`)
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
            client
              .sendButtons(message.from, 'Confirmar pedido', sino, 'Confirmas que es correcto el pedido?')
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
        }



    if (message.body.includes('$') && message.isGroupMsg === false && aceptado === "procesando") {
        hamburguesas_pedidas.push(message.body);
        let recuentoHamburguesas = {};
            let total = 0;
        
            hamburguesas_pedidas.forEach(hamburguesa => {
                if (recuentoHamburguesas[hamburguesa]) {
                    recuentoHamburguesas[hamburguesa]++;
                } else {
                    recuentoHamburguesas[hamburguesa] = 1;
                }
                total += Number(hamburguesa.split('$')[1]);
            });
        
            let pedido = Object.entries(recuentoHamburguesas)
              .map(([hamburguesa, count]) => `${hamburguesa} x ${count}`)
              .join('\n');

        
        client
            
          .sendText(message.from, `Pedido:\n\n${pedido}\n\nTotal: $${total}`)
          .catch((err) => console.error('Error al enviar mensaje: ', err));
        client
        .sendButtons(message.from, 'Selecciona una hamburguesa', burgers, 'Si quieres continuar agregando productos selecciona uno, si quieres finalizar el pedido da clic en finalizar pedido.')
        .then((result) => {
        console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        });
        
      }




    if (message.body === 'Ver el menú' && message.isGroupMsg === false && aceptado === "procesando") {
        client
        .sendText(message.from, 'Aquí está nuestro menú')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
        
          client
          .sendImage(message.from,'https://foodlocker.mx/assets/logo.png','image-name','Caption text')
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });

          
      }
  });
}


