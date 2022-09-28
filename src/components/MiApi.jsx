import React, { useState, useEffect } from "react";
import "./miApi.css";
import sakura from "../imgs/sakura.png"

const MiApi = () => {
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  // 2. LLamamos al función que consume la API al momento de montar el componente

  const consultarInformacion = async () => {
    const url = "https://protected-taiga-89091.herokuapp.com/api/card";
    const response = await fetch(url);
    const { data } = await response.json();
    data.forEach((element, id) => {
      if (
        !data[id].hasOwnProperty("spanishName") &&
        !data[id].hasOwnProperty("sakuraCard")
      ) {
        data.splice(id);
      }
    });
    setInfo(data); // con setInfo actualizamos el estado
    //data[1].images.original.url
  };
  useEffect(() => {
    consultarInformacion();
  }, []);
  //funcion busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  //metodo filtrado
  let results = [];
  if (!search) {
    results = info;
  } else {
    results = info.filter((dato) =>
      dato.spanishName.toLowerCase().includes(search.toLowerCase())
    );
  }
  //metodo ordenar
  const sortByNameAz = (e) => {
    if (sort === "clicked") {
      setSort("unclicked");
    } else if (sort === "" || sort === "unclicked") {
      setSort("clicked");
    }
  };

  if (sort === "clicked") {
    results = Array.from(results).sort((a, b) =>
      a.spanishName.localeCompare(b.spanishName)
    );
  } else if (sort === "unclicked") {
    results = Array.from(results).sort(
      (a, b) => -1 * a.spanishName.localeCompare(b.spanishName)
    );
  }

  /*const sortByNameZa = (e) => {
      console.log(e.target.getAttribute("value"));
      setSort(false);
    };*/
  return (
    <div className="d-flex flex-column mynav">
      <nav className="navbar navbar-expand-lg navbar-bg-crd">
        <div className="container d-flex flex-row align-items-center">
          <a
            className="navbar-brand d-flex flex-row align-items-center"
            href="index.html"
          >
            <img
              src={sakura}
              className="sakura-img"
              alt="sakura"
            />
            <h1 className="myTitle">Sakura's Card</h1>
          </a>
          <div>
            <form className="form-inline">
              <div className="input-group search-box gold-border">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar carta"
                  aria-label="Search for..."
                  value={search}
                  onChange={searcher}
                />
                <span className="input-group-btn">
                  <button
                    className="btn"
                    value={sort}
                    onClick={sortByNameAz}
                    type="button"
                  >
                    {sort === "" || sort === "clicked" ? (
                      <i className="fa-solid fa-arrow-down-a-z text-light"></i>
                    ) : (
                      <i className="fa-solid fa-arrow-up-a-z text-light"></i>
                    )}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <div className="row"></div>
      <div className="row py-4">
        {results.map((sakcard) => (
          <div
            key={sakcard.cardNumber}
            className="col-xl-3 col-lg-4 col-md-4 mb-4 pink-col"
          >
            <div className="sakcard rounded">
              <div className="img-container-card">
                <img
                  key={sakcard.cardNumber}
                  src={sakcard.sakuraCard}
                  alt={sakcard.spanishName}
                  className="cardpic"
                />
              </div>
              <div className="cardtext p-3">
                <h4 >{sakcard.spanishName}</h4>
                <p className="small mb-0">{sakcard.meaning}</p>
                <div className="d-flex align-items-center justify-content-center rounded-pill bg-light mt-4">
                  <div className="d-flex badge px-3 rounded-pill font-weight-normal pink-text">
                    <span className="font-weight-bold gold-s">{sakcard.kanji}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiApi;
