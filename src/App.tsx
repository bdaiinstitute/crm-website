import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IiwaComponent } from "./components/iiwa/IiwaComponent";
import { AllegroComponent } from "./components/allegro/AllegroComponent";

import "academicons/css/academicons.min.css";

import "./App.css";
import "./index.css";

const App = () => {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Header. */}
      <section className="hero">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                {/* Title. */}
                <h1 className="title is-1 publication-title">
                  Contact Rich Manipulation
                </h1>

                {/* Authors. */}
                <div className="is-size-5 publication-authors">
                  <span className="author-block">
                    <a href="#" target="_blank">
                      Tao Pang
                      <sup>1</sup>,&nbsp;
                    </a>
                  </span>
                  <span className="author-block">
                    <a href="#" target="_blank">
                      Tong Zhao
                      <sup>2</sup>&nbsp;
                    </a>
                  </span>
                </div>

                {/* Publication links. */}
                <div className="column has-text-centered">
                  <div className="publication-links">
                    {/* arxiv Link. */}
                    <span className="link-block">
                      <a
                        href="https://arxiv.org/abs/2407.20179"
                        target="_blank"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="ai ai-arxiv"></i>
                        </span>
                        <span>arXiv</span>
                      </a>
                    </span>

                    {/* Code Link. */}
                    <span className="link-block">
                      <a
                        href="https://github.com/bdaiinstitute/#"
                        target="_blank"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <FontAwesomeIcon icon={faGithub} />
                        </span>
                        <span>Code</span>
                      </a>
                    </span>

                    {/* Datasets. */}
                    <span className="link-block">
                      <a
                        href="https://github.com/bdaiinstitute/#"
                        target="_blank"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <FontAwesomeIcon icon={faGithub} />
                        </span>
                        <span>Datasets</span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract. */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">Abstract</h2>
              <div className="content has-text-justified">
                <p>
                  Athenae cum florerent aequis legibus, procax libertas civitatem miscuit,
                  frenumque solvit pristinum licentia. Hic conspiratis factionum partibus
                  arcem tyrannus occupat Pisistratus. Cum tristem servitutem flerent
                  Attici, non quia crudelis ille, sed quoniam grave omne insuetis onus, et
                  coepissent queri, Aesopus talem tum fabellam rettulit. 'Ranae, vagantes
                  liberis paludibus, clamore magno regem petiere ab Iove, qui dissolutos
                  mores vi compesceret. Pater deorum risit atque illis dedit parvum
                  tigillum, missum quod subito vadi motu sonoque terruit pavidum genus.
                  Hoc mersum limo cum iaceret diutius, forte una tacite profert e stagno
                  caput, et explorato rege cunctas evocat. Illae timore posito certatim
                  adnatant, lignumque supra turba petulans insilit. Quod cum inquinassent
                  omni contumelia, alium rogantes regem misere ad Iovem, inutilis quoniam
                  esset qui fuerat datus. Tum misit illis hydrum, qui dente aspero
                  corripere coepit singulas. Frustra necem fugitant inertes; vocem
                  praecludit metus. Furtim igitur dant Mercurio mandata ad Iovem,
                  adflictis ut succurrat. Tunc contra Tonans "Quia noluistis vestrum
                  ferre" inquit "bonum, malum perferte". Vos quoque, o cives,' ait 'hoc
                  sustinete, maius ne veniat, malum'.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IIWA section. */}
      <section>
        <div className="columns is-centered">
          <div className="column is-full-width">
            <h2 className="title is-3">Lupus et Agnus</h2>
            <div className="content has-text-justified">
              <p>
                Ad rivum eundem lupus et agnus venerant, siti compulsi. Superior stabat
                lupus, longeque inferior agnus. Tunc fauce improba latro incitatus iurgii
                causam intulit; 'Cur' inquit 'turbulentam fecisti mihi aquam bibenti?'
                Laniger contra timens 'Qui possum, quaeso, facere quod quereris, lupe? A
                te decurrit ad meos haustus liquor'. Repulsus ille veritatis viribus 'Ante
                hos sex menses male' ait 'dixisti mihi'. Respondit agnus 'Equidem natus
                non eram'. 'Pater hercle tuus' ille inquit 'male dixit mihi'; atque ita
                correptum lacerat iniusta nece. Haec propter illos scripta est homines
                fabula qui fictis causis innocentes opprimunt.
              </p>
            </div>
            <br />
            <IiwaComponent />
            <br />
          </div>
        </div>
      </section>

      {/* Allegro section. */}
      <section>
        <div className="columns is-centered">
          <div className="column is-full-width">
            <h2 className="title is-3">Asinus et Leo Venantes</h2>
            <div className="content has-text-justified">
              <p>
                Virtutis expers, verbis iactans gloriam, ignotos fallit, notis est
                derisui. Venari asello comite cum vellet leo, contexit illum frutice et
                admonuit simul ut insueta voce terreret feras, fugientes ipse exciperet.
                Hic auritulus clamorem subito totis tollit viribus, novoque turbat bestias
                miraculo: quae, dum paventes exitus notos petunt, leonis adfliguntur
                horrendo impetu. Qui postquam caede fessus est, asinum evocat, iubetque
                vocem premere. Tunc ille insolens 'Qualis videtur opera tibi vocis meae?'
                'Insignis' inquit 'sic ut, nisi nossem tuum animum genusque, simili
                fugissem metu'.
              </p>
            </div>
            <br />
            <AllegroComponent />
            <br />
          </div>
        </div>
      </section>
    </QueryClientProvider>
  );
};

export default App;
