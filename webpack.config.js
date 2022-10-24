const path = require('path');
// path ya esta añadido en node asique no hace falta instalar dependencias.

const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');



module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js", // Este es el elemento incial. A partir de ahi todo se va conectando
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),// Ver que resolve es un metodo de path que es el const que declaramos al inicio del codigo.
    // filename le pone el nombre al archivo final
    filename: "main.js",// Este nombre puede ser otro
    assetModuleFilename: 'assets/images/[hash][ext]' //Esta instrucción hace que webpack le agregue un hash ( un hash es una serie de caracteres aleatorios) y su extencion por medio de esas variables en el string
  },
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"]
  },
  module: { // Le agregamos esto para que Webpack sepa que tiene que trabajhar con babel y como hacerlo
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?js$/, // Ver curso de expresiones regulares pero lo que dice es utiliza cualquier archivo cuya extension sea js.
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        },
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/ // Si usa archivos de node_modules la app se romperia totalmente
      },
      {
        test: /\.css|.styl$/i,  // .styl$/i es la extension del preprocesador stylus.
        use: [MiniCssExtractPlugin.loader, // El use lo puedo pasar como un objeto o como un array
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.(woff|woff2)$/, 
        use: {
          loader: 'url-loader',
                options: {
                  limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
                  // Habilita o deshabilita la transformación de archivos en base64.
                mimetype: 'aplication/font-woff',
                // Especifica el tipo MIME con el que se alineará el archivo. 
                // Los MIME Types (Multipurpose Internet Mail Extensions)
                // son la manera standard de mandar contenido a través de la red.
                name: "[name].[ext]",
                // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                // ubuntu-regularhola.woff
                outputPath: './assets/fonts/', 
                // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                publicPath: './assets/fonts/',
                // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                esModule: false 
              // AVISAR EXPLICITAMENTE SI ES UN MODULO
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({// Hago un objeto donde le paso las configuraciones
        inject: true,
        template: './public/index.html',
        filename: './index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"  // No entiendo 100 por cuento porque cambia la ruta ahi. Creo que lo hace porque despues cuando la informacion este empaquetada la tiene que buscar de la carpeta assets.
      }]
      
    })
  ]
}

//Mi unica duda son las expresiones regulares que no se como se hacen.

