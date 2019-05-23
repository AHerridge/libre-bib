import React, { Component } from "react";
import { withRouter } from "react-router";
import Quagga from "quagga";

class BarcodeScanner extends Component {
  componentDidMount() {
    let props = this.props;

    var App = {
      init: function() {
        App.attachListeners();
      },
      attachListeners: function() {
        document.getElementById("fileSelector").onchange = function(e) {
          if (e.target.files && e.target.files.length) {
            App.decode(URL.createObjectURL(e.target.files[0]));
          }
        };

        document.getElementById("rerunBtn").onclick = function(e) {
          var input = document.querySelector(".controls input[type=file]");
          if (input.files && input.files.length) {
            App.decode(URL.createObjectURL(input.files[0]));
          }
        };
      },
      decode: function(src) {
        let config = this.state;
        config.src = src;

        Quagga.decodeSingle(config, function(result) {});
      },
      state: {
        inputStream: {
          size: 800,
          singleChannel: false
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        decoder: {
          readers: [
            {
              format: "ean_reader",
              config: {}
            }
          ]
        },
        locate: true,
        src: null
      }
    };

    App.init();

    function calculateRectFromArea(canvas, area) {
      var canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        top = parseInt(area.top) / 100,
        right = parseInt(area.right) / 100,
        bottom = parseInt(area.bottom) / 100,
        left = parseInt(area.left) / 100;

      top *= canvasHeight;
      right = canvasWidth - canvasWidth * right;
      bottom = canvasHeight - canvasHeight * bottom;
      left *= canvasWidth;

      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      };
    }

    Quagga.onProcessed(function(result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay,
        area;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }

        if (App.state.inputStream.area) {
          area = calculateRectFromArea(
            drawingCanvas,
            App.state.inputStream.area
          );
          drawingCtx.strokeStyle = "#0F0";
          drawingCtx.strokeRect(area.x, area.y, area.width, area.height);
        }
      }
    });

    Quagga.onDetected(function(result) {
      var code = result.codeResult.code;
      props.history.push(`/books/${code}`);
    });
  }

  render() {
    return (
      <section id="container" className="container">
        <div className="controls">
          <fieldset className="input-group">
            <input
              id="fileSelector"
              type="file"
              accept="image/*"
              capture="camera"
            />
            <button id="rerunBtn">Rerun</button>
          </fieldset>
        </div>
        <div id="result_strip">
          <ul className="thumbnails" />
        </div>
        <div id="interactive" className="viewport" />
        <div id="debug" className="detection" />
      </section>
    );
  }
}

export default withRouter(BarcodeScanner);
