const usuarios = require("../app/models/user");
const cartas = require("../app/models/carta");
const ventacartas = require("../app/models/ventacartas");
const apuestacartas = require("../app/models/apuestacartas");

module.exports = (app, passport) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/login", (req, res) => {
    res.render("login", {
      message: req.flash("loginMessage"),
    });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/signup", (req, res) => {
    res.render("signup", {
      message: req.flash("signupMessage"),
    });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  app.get("/profile", isLoggedIn, async (req, res) => {
    var datosDelUsuario = req.user;

    var arrayDeCartasParaUsuarioNuevo = [];
    const todasLasCartasQueExisten = await cartas.find();
    //Agarrar su mazo
    var mazoUsuarioOk = datosDelUsuario.mazoUsuario;
    var todasLasCartasUsuarioOk = datosDelUsuario.todasLasCartasUsuario;

    if (mazoUsuarioOk.length === 0 && todasLasCartasUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var mazoJson = JSON.stringify(mazoUsuarioOk);

      //Aca hay que arreglar
      //   datosDelUsuario.mazoUsuario.updateMany(mazoJson);

      // await datosDelUsuario.updateMany({mazoJson: mazoJson}, req.body);
      arrayDeCartasParaUsuarioNuevo = [];
      for (i = 0; i < 4; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var restoDeCartasJson = JSON.stringify(todasLasCartasUsuarioOk);

      //Aca hay que arreglar
      //datosDelUsuario.todasLasCartasUsuario.updateMany(restoDeCartasJson);
    }

    res.render("profile", {
      user: req.user,
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/");
  }

  app.post("/guardarPerfil/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await usuarios.updateOne({ _id: id }, req.body);
    console.log(usuarios(req.body));
    return res.redirect("/profile");
  });

  app.get("/inventario/:id", isLoggedIn, async (req, res) => {
    //array para usar si el mazo esta vacio
    var arrayDeCartasParaUsuarioNuevo = [];
    //para buscar las cartas que tiene el usuario
    const { id } = req.params;
    //Buscar todos los datos del usuario
    const datosDelUsuario = await usuarios.findOne({ _id: id }, req.body);
    //Buscar todas las cartas por si el usuario necesita tener un mazo inicial
    const todasLasCartasQueExisten = await cartas.find();
    //Agarrar su mazo
    var mazoUsuarioOk = datosDelUsuario.mazoUsuario;
    var todasLasCartasUsuarioOk = datosDelUsuario.todasLasCartasUsuario;

    if (mazoUsuarioOk.length === 0 && todasLasCartasUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      arrayDeCartasParaUsuarioNuevo = [];
      for (i = 0; i < 4; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var mazoJson = JSON.stringify(mazoUsuarioOk);
      var restoDeCartasJson = JSON.stringify(todasLasCartasUsuarioOk);
    } else {
      var mazoJson = mazoUsuarioOk;
      var restoDeCartasJson = todasLasCartasUsuarioOk;
    }

    if (mazoUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var mazoJson = JSON.stringify(mazoUsuarioOk);
    }

    res.render("inventario", {
      restoDeCartasJson,
      mazoJson,
      user: req.user,
    });
  });

  app.get("/galeria", isLoggedIn, async (req, res) => {
    const todasLasCartasQueExisten = await cartas.find();
    const cartasventa = await ventacartas.find();
    const cartasapuesta = await apuestacartas.find();

    res.render("galeria", {
      todasLasCartasQueExisten,
      cartasventa,
      cartasapuesta,
      user: req.user,
    });
  });

  app.get("/tienda/:id", isLoggedIn, async (req, res) => {
    //Buscar las cartas que estan a la venta
    const ventacartasTemp = await ventacartas.find();
    var ventacartasOK = JSON.stringify(ventacartasTemp);
    //array para usar si el mazo esta vacio
    var arrayDeCartasParaUsuarioNuevo = [];
    //para buscar las cartas que tiene el usuario
    const { id } = req.params;
    //Buscar todos los datos del usuario
    const datosDelUsuario = await usuarios.findOne({ _id: id }, req.body);
    //Buscar todas las cartas por si el usuario necesita tener un mazo inicial
    const todasLasCartasQueExisten = await cartas.find();

    //Agarrar su mazo
    var mazoUsuarioOk = datosDelUsuario.mazoUsuario;
    var todasLasCartasUsuarioOk = datosDelUsuario.todasLasCartasUsuario;
    if (mazoUsuarioOk.length === 0 && todasLasCartasUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      arrayDeCartasParaUsuarioNuevo = [];
      for (i = 0; i < 4; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var mazoJson = JSON.stringify(mazoUsuarioOk);
      var restoDeCartasJson = JSON.stringify(todasLasCartasUsuarioOk);
    } else {
      var mazoJson = mazoUsuarioOk;
      var restoDeCartasJson = todasLasCartasUsuarioOk;
    }

    if (mazoUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var mazoJson = JSON.stringify(mazoUsuarioOk);
    }

    res.render("tienda", {
      restoDeCartasJson,
      mazoJson,
      ventacartasOK,
      user: req.user,
    });
  });

  app.get("/apostar/:id", isLoggedIn, async (req, res) => {
    //Buscar las cartas que estan a la venta
    const apuestacartasTemp = await apuestacartas.find();
    var apuestacartasOK = JSON.stringify(apuestacartasTemp);
    //array para usar si el mazo esta vacio
    var arrayDeCartasParaUsuarioNuevo = [];
    //para buscar las cartas que tiene el usuario
    const { id } = req.params;
    //Buscar todos los datos del usuario
    const datosDelUsuario = await usuarios.findOne({ _id: id }, req.body);
    //Buscar todas las cartas por si el usuario necesita tener un mazo inicial
    const todasLasCartasQueExisten = await cartas.find();

    //Agarrar su mazo
    var mazoUsuarioOk = datosDelUsuario.mazoUsuario;
    var todasLasCartasUsuarioOk = datosDelUsuario.todasLasCartasUsuario;
    if (mazoUsuarioOk.length === 0 && todasLasCartasUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      arrayDeCartasParaUsuarioNuevo = [];
      for (i = 0; i < 4; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;

      var mazoJson = JSON.stringify(mazoUsuarioOk);
      var restoDeCartasJson = JSON.stringify(todasLasCartasUsuarioOk);
    } else {
      var mazoJson = mazoUsuarioOk;
      var restoDeCartasJson = todasLasCartasUsuarioOk;
    }

    res.render("apostar", {
      restoDeCartasJson,
      mazoJson,
      apuestacartasOK,
      user: req.user,
    });
  });

  app.post("/guardarInventario/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await usuarios.updateMany({ _id: id }, req.body);

    return res.redirect("/profile");
  });

  app.post("/apostarGuardar/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await usuarios.updateMany({ _id: id }, req.body);

    return res.redirect("/profile");
  });

  app.get("/jugar/:id", isLoggedIn, async (req, res) => {
    //array para usar si el mazo esta vacio
    var arrayDeCartasParaUsuarioNuevo = [];
    //para buscar las cartas que tiene el usuario
    const { id } = req.params;
    //Buscar todos los datos del usuario
    const datosDelUsuario = await usuarios.findOne({ _id: id }, req.body);
    //Buscar todas las cartas por si el usuario necesita tener un mazo inicial
    const todasLasCartasQueExisten = await cartas.find();
    //Agarrar su mazo
    var mazoUsuarioOk = datosDelUsuario.mazoUsuario;
    var todasLasCartasUsuarioOk = datosDelUsuario.todasLasCartasUsuario;

    if (mazoUsuarioOk.length === 0 && todasLasCartasUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      arrayDeCartasParaUsuarioNuevo = [];
      for (i = 0; i < 4; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var mazoJson = JSON.stringify(mazoUsuarioOk);
      var restoDeCartasJson = JSON.stringify(todasLasCartasUsuarioOk);
    } else {
      var mazoJson = mazoUsuarioOk;
      var restoDeCartasJson = todasLasCartasUsuarioOk;
    }

    if (mazoUsuarioOk.length === 0) {
      console.log("Este usuario no tiene cartas, se asume que es nuevo");
      for (i = 0; i < 20; i++) {
        arrayDeCartasParaUsuarioNuevo.push(todasLasCartasQueExisten[i]);
      }
      mazoUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      todasLasCartasUsuarioOk = arrayDeCartasParaUsuarioNuevo;
      var mazoJson = JSON.stringify(mazoUsuarioOk);
    }
    var mazoCpu = JSON.stringify(todasLasCartasQueExisten);

    res.render("jugar", {
      user: req.user,
      mazoCpu,
      restoDeCartasJson,
      mazoJson,
    });
  });
};
