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
                  Dexterous Contact-Rich Manipulation via the Contact Trust Region
                </h1>
                {/* Authors. */}
                <div className="is-size-5 publication-authors">
                  <span className="author-block">
                    <a href="https://hjrobotics.net/" target="_blank">
                      H.J. Terry Suh*
                    </a>
                    <sup>1</sup>
                  </span>
                  ,&nbsp;
                  <span className="author-block">
                    <a href="https://pangtao.xyz/" target="_blank">
                      Tao Pang*
                    </a>
                    <sup>2</sup>
                  </span>
                  ,&nbsp;
                  <span className="author-block">
                    <a
                      href="https://scholar.google.com/citations?hl=en&user=0y5qiEUAAAAJ&view_op=list_works&sortby=pubdate"
                      target="_blank"
                    >
                      Tong Zhao
                    </a>
                    <sup>2</sup>
                  </span>
                  &nbsp;and&nbsp;
                  <span className="author-block">
                    <a href="https://locomotion.csail.mit.edu/russt.html" target="_blank">
                      Russ Tedrake
                    </a>
                    <sup>1</sup>
                  </span>
                </div>

                {/* Contributions. */}
                <div className="is-size-6 publication-authors">
                  <span className="author-block">*Equal contribution</span>
                </div>

                {/* Affiliations. */}
                <div className="is-size-6 publication-authors">
                  <span className="author-block">
                    <sup>1</sup>Computer Science and Artificial Intelligence Laboratory
                    (CSAIL), Massachusetts Institute of Technology
                  </span>
                </div>
                <div className="is-size-6 publication-authors">
                  <span className="author-block">
                    <sup>2</sup>Boston Dynamics AI Institute.
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

      {/* Teaser. */}
      <section className="hero teaser">
        <div className="container is-max-desktop">
          <div className="hero-body">
            <video
              id="teaser"
              style={{
                width: `100%`,
                height: `100%`,
                borderColor: `lightgray`,
                borderWidth: `1px`
              }}
              autoPlay
              muted
              loop
              playsInline
              src="./contact_trust_region.mp4"
              controls
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
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
                  What is a good local description of contact dynamics for contact-rich
                  manipulation, and where can we trust this local description? While many
                  approaches often rely on the Taylor approximation of dynamics with an
                  ellipsoidal trust region, we argue that such approaches are
                  fundamentally inconsistent with the unilateral nature of contact. As a
                  remedy, we present the Contact Trust Region (CTR), which captures the
                  unilateral nature of contact while remaining efficient for computation.
                  With CTR, we first develop a Model-Predictive Control (MPC) algorithm
                  capable of synthesizing local contact-rich plans. Then, we extend this
                  capability to plan globally by stitching together local MPC plans,
                  enabling efficient and dexterous contact-rich manipulation. To verify
                  the performance of our method, we perform comprehensive evaluations,
                  both in high-fidelity simulation and on hardware, on two contact-rich
                  systems: a planar IiwaBimanual system and a 3D AllegroHand system. On
                  both systems, our method offers a significantly lower-compute
                  alternative to existing RL-based approaches to contact-rich
                  manipulation. In particular, our Allegro in-hand manipulation policy, in
                  the form of a roadmap, takes less than 10 minutes to build offline on a
                  standard laptop, and online inference takes a few seconds.
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
            <h2 className="title is-3">IIWA</h2>
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
            <h2 className="title is-3">Allegro</h2>
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
