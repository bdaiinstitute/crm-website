import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IiwaComponent } from "./components/iiwa/IiwaComponent";
import { AllegroComponent } from "./components/allegro/AllegroComponent";
import { VideoCarousel } from "./components/carousel/VideoCarousel";

import "academicons/css/academicons.min.css";

import "./App.css";
import "./index.css";

const App = () => {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  const videoData = [
    {
      id: 1,
      src: "./carousel/experiments_collage_allegro.mp4",
      title: "Allegro experiments"
    },
    {
      id: 2,
      src: "./carousel/experiments_collage_iiwa.mp4",
      title: "Iiwa experiments"
    },
    {
      id: 3,
      src: "./carousel/random_walk_on_graph.mp4",
      title: "Random walk on graph"
    },
    {
      id: 4,
      src: "./carousel/reaching_random_global_goals.mp4",
      title: "Reaching random global goals"
    }
  ];

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
                    <sup>1</sup>Massachusetts Institute of Technology
                  </span>
                </div>
                <div className="is-size-6 publication-authors">
                  <span className="author-block">
                    <sup>2</sup>RAI Institute (formerly Boston Dynamics AI Institute).
                  </span>
                </div>

                {/* Publication links. */}
                <div className="column has-text-centered">
                  <div className="publication-links">
                    {/* arxiv Link. */}
                    <span className="link-block">
                      <a
                        href="https://www.arxiv.org/abs/2505.02291"
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
                        href="#"
                        target="_blank"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <FontAwesomeIcon icon={faGithub} />
                        </span>
                        <span>Code (coming soon)</span>
                      </a>
                    </span>

                    {/* Datasets. */}
                    <span className="link-block">
                      <a
                        href="https://github.com/bdaiinstitute/crm-website/tree/main/public/data"
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

      {/* Carousel. */}
      <section>
        <VideoCarousel videos={videoData} />
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
                  enabling efficient and dexterous contact-rich manipulation.
                  To verify the performance of our method, we perform comprehensive evaluations, both in high-fidelity simulation and on hardware, on two contact-rich systems: a planar IiwaBimanual system and a 3D AllegroHand system. On both systems, our method offers a significantly lower-compute alternative to existing RL-based approaches to contact-rich manipulation. In particular, our Allegro in-hand manipulation policy, in the form of a roadmap, takes fewer than 10 minutes to build offline on a standard laptop using just its CPU, with online inference taking just a few seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaser. */}
      <section>
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">Video</h2>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  borderColor: "light-grey",
                  borderWidth: 1
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/kSQZwOz64rg?si=-azM9eJC6ezphKaF?mute=1&loop=1&vq=hd1080"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none"
                  }}
                  allow="autoplay; encrypted-media; clipboard-write;"
                  allowFullScreen
                  title="Teaser Video"
                ></iframe>
              </div>
              <br />
            </div>
          </div>
        </div>
      </section>

      {/* IIWA section. */}
      <section>
        <h2 className="title is-3">IIWA</h2>
        <IiwaComponent />
      </section>

      {/* Allegro section. */}
      <section>
        <h2 className="title is-3">Allegro</h2>
        <AllegroComponent />
      </section>
    </QueryClientProvider>
  );
};

export default App;
