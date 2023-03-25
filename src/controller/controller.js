var Todo = require("../model/schema");
const HTTP = require("../../constant/response.constant");

class class1 {
  static a = async (req, res) => {
    try {
      var OriginalData = await Todo.find({});
      res.render("First", { OriginalData });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static b = async (req, res) => {
    try {
      var OriginalData = await Todo.find({});
      res.render("show", { OriginalData });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static c = async (req, res) => {
    try {
      var OriginalData = req.params.id;
      res.render("index", { OriginalData });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static d = async (req, res) => {
    try {
      var keyArray = [];
      var ValueArray = [];
      var senddata = [];
      for (var m = 0; m < Object.keys(req.body).length; m++) {
        if (Object.keys(req.body).includes("Key" + (m + 1))) {
          keyArray.push("Key" + (m + 1));
        }
      }

      for (var n = 0; n < keyArray.length - 1; n++) {
        if (
          Object.keys(req.body).indexOf(keyArray[n]) + 1 ==
          Object.keys(req.body).indexOf(keyArray[n + 1])
        ) {
          ValueArray.push([]);
        } else {
          ValueArray.push(
            Object.keys(req.body)[
              Object.keys(req.body).indexOf(keyArray[n]) + 1
            ]
          );
        }
      }

      if (
        !keyArray.includes(
          Object.keys(req.body)[Object.keys(req.body).length - 1]
        )
      ) {
        ValueArray.push(
          Object.keys(req.body)[Object.keys(req.body).length - 1]
        );
      }

      for (var p = 0; p < keyArray.length; p++) {
        var object = {};

        if (req.body[ValueArray[p]] === undefined) {
          object[req.body[keyArray[p]]] = [];
        } else {
          if (Array.isArray(req.body[ValueArray[p]])) {
            var data = req.body[ValueArray[p]];
          } else {
            var data = [req.body[ValueArray[p]]];
          }
          object[req.body[keyArray[p]]] = data;
        }

        senddata.push(object);
      }

      for (var q = 0; q < senddata.length; q++) {
        if (!Array.isArray(Object.values(senddata[q])[0])) {
          delete senddata[q][Object.keys(senddata[q])[0]];
        }
      }

      senddata.unshift({
        App: [req.params.id],
      });

      let finalObject = {};

      for (let g = 0; g < senddata.length; g++) {
        Object.assign(finalObject, senddata[g]);
      }

      var OriginalData = await Todo.find({});
      for (var f = 0; f < OriginalData.length; f++) {
        if (OriginalData[f].Data.App[0] == req.params.id) {
          await Todo.findByIdAndDelete(OriginalData[f]._id);
        }
      }

      await new Todo({
        Data: finalObject,
      }).save();

      res.send("data added");
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static e = async (req, res) => {
    try {
      var OriginalData = await Todo.find({});
      var array = [];
      for (var i = 0; i < OriginalData.length; i++) {
        if (OriginalData[i].Data.App[0] == req.params.id)
          array.push(OriginalData[i].Data);
      }
      res.send(array);
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
}

module.exports = { class1 };
