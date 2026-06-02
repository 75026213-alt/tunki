import { useMemo, useRef, useState } from "react";
import styles from "./TunkiAmigo.module.css";
import fondo2 from "../assets/tunki-amigo/fondo2.jpg";
import fondo3 from "../assets/tunki-amigo/fondo3.jpg";
import portadaCafe from "../assets/tunki-amigo/portada cafe.jpg";
import baristaImage from "../assets/tunki-amigo/imagen-1.jpg";
import degustadorImage from "../assets/tunki-amigo/degustador.jpg";
import degustadorTwoImage from "../assets/tunki-amigo/degustador2.jpg";
import commentOneImage from "../assets/tunki-amigo/comentario1.jpg";
import commentTwoImage from "../assets/tunki-amigo/comentario2.jpg";
import commentThreeImage from "../assets/tunki-amigo/comentario3.jpg";

const communityMembers = [
  {
    id: "jean-paul",
    name: "Jean Paul Rodriguez",
    role: "Barista",
    quote: "Mi momento favorito del día es con café.",
    image: baristaImage,
  },
  {
    id: "carlos",
    name: "Carlos Ramirez",
    role: "Catador de Café",
    quote: "Destaca por su aroma intenso y sabor suave.",
    image: degustadorImage,
  },
  {
    id: "ana",
    name: "Ana Lopez",
    role: "Barista Tunki",
    quote: "Hermoso lugar para aprender y compartir.",
    image: degustadorTwoImage,
  },
];

const duplicatedMembers = [...communityMembers, ...communityMembers].map(
  (member, index) => ({
    ...member,
    id: `${member.id}-${index}`,
  })
);

const backgroundImages = [portadaCafe, fondo2, fondo3];

const initialComments = [
  {
    name: "Romina Sanchez",
    text: "El aroma y sabor del café Tunki realmente marcan la diferencia. Una experiencia que volveria a repetir.",
    image: commentOneImage,
    rating: 5,
  },
  {
    name: "Emily Johnson",
    text: "Me encantó probar este café, tiene un sabor muy equilibrado y se nota la calidad del café peruano.",
    image: commentTwoImage,
    rating: 5,
  },
  {
    name: "Daniel Smith",
    text: "Un café delicioso para compartir en cualquier momento del día. Definitivamente lo recomiendo.",
    image: commentThreeImage,
    rating: 5,
  },
];

export default function TunkiAmigo() {
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [currentBackground, setCurrentBackground] = useState(portadaCafe);
  const [isSlidingCards, setIsSlidingCards] = useState(false);
  const [isResettingRail, setIsResettingRail] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isMomentModalOpen, setIsMomentModalOpen] = useState(false);
  const [publishedComments, setPublishedComments] = useState(initialComments);
  const [commentForm, setCommentForm] = useState({ text: "", rating: "5" });
  const [momentForm, setMomentForm] = useState({
    description: "",
    image: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const nextMemberIndexRef = useRef(0);

  const visibleMembers = useMemo(
    () => [
      ...duplicatedMembers.slice(activeMemberIndex),
      ...duplicatedMembers.slice(0, activeMemberIndex),
    ],
    [activeMemberIndex]
  );

  const showNextMember = () => {
    if (isSlidingCards) {
      return;
    }

    const nextMemberIndex = (activeMemberIndex + 1) % duplicatedMembers.length;
    const nextBackground =
      backgroundImages[nextMemberIndex % backgroundImages.length];

    setCurrentBackground(nextBackground);
    nextMemberIndexRef.current = nextMemberIndex;
    setIsSlidingCards(true);
  };

  const finishCardSlide = (event) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform" ||
      !isSlidingCards
    ) {
      return;
    }

    setIsResettingRail(true);
    setActiveMemberIndex(nextMemberIndexRef.current);
    setIsSlidingCards(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsResettingRail(false);
      });
    });
  };

  const openCommentModal = () => {
    setFormMessage("");
    setIsCommentModalOpen(true);
  };

  const openMomentModal = () => {
    setFormMessage("");
    setIsMomentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setFormMessage("");
  };

  const closeMomentModal = () => {
    setIsMomentModalOpen(false);
    setFormMessage("");
  };

  const submitComment = (event) => {
    event.preventDefault();

    if (!commentForm.text.trim()) {
      setFormMessage("Escribe un comentario antes de publicarlo.");
      return;
    }

    setPublishedComments((currentComments) => [
      {
        name: "Mariana Tunki",
        text: commentForm.text.trim(),
        image: commentOneImage,
        rating: Number(commentForm.rating),
      },
      ...currentComments,
    ]);
    setCommentForm({ text: "", rating: "5" });
    closeCommentModal();
  };

  const submitMoment = (event) => {
    event.preventDefault();

    if (!momentForm.description.trim()) {
      setFormMessage("Cuentanos algo sobre tu momento Tunki.");
      return;
    }

    setPublishedComments((currentComments) => [
      {
        name: "Tunki Friend",
        text: momentForm.description.trim(),
        image: momentForm.image || commentTwoImage,
        rating: 5,
      },
      ...currentComments,
    ]);
    setMomentForm({ description: "", image: "" });
    closeMomentModal();
  };

  const handleMomentImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setMomentForm((currentForm) => ({ ...currentForm, image: "" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMomentForm((currentForm) => ({
        ...currentForm,
        image: String(reader.result),
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={styles.tunkiAmigo}
      style={{
        "--tunki-amigo-bg": `url(${currentBackground})`,
      }}
    >
      <section className={styles.heroCommunity}>
        <div className={styles.heroCopy}>
          <h1>"Nuestra comunidad! El alma de Tunki Coffee"</h1>
          <button onClick={openMomentModal} type="button">
            Compartir Momento
          </button>
        </div>

        <div className={styles.memberCarousel}>
          <div className={styles.memberViewport}>
            <div
              className={`${styles.memberRail} ${
                isSlidingCards ? styles.slidingRail : ""
              } ${isResettingRail ? styles.resettingRail : ""}`}
              aria-label="Comunidad Tunki Coffee"
              onTransitionEnd={finishCardSlide}
            >
              {visibleMembers.map((member, index) => (
                <article
                  className={`${styles.memberCard} ${
                    (isSlidingCards ? index === 1 : index === 0)
                      ? styles.featuredMember
                      : ""
                  }`}
                  key={member.id}
                >
                  <img src={member.image} alt={`Retrato de ${member.name}`} />
                  <div className={styles.memberInfo}>
                    <h2>{member.name}</h2>
                    <p>{member.role}</p>
                    <strong>{member.quote}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            aria-label="Ver siguiente miembro"
            className={styles.nextMemberButton}
            disabled={isSlidingCards}
            onClick={showNextMember}
            type="button"
          >
            &gt;
          </button>
        </div>
      </section>

      <section className={styles.commentsSection}>
        <p className={styles.inviteText}>
          "!Tu pasión tiene premio! Comparte tu foto y recibe un beneficio
          exclusivo".
        </p>
        <h2>Comentarios</h2>

        <div className={styles.commentGrid}>
          {publishedComments.map((comment, index) => (
            <article className={styles.commentCard} key={`${comment.name}-${index}`}>
              <img src={comment.image} alt="" aria-hidden="true" />
              <h3>{comment.name}</h3>
              <div
                className={styles.stars}
                aria-label={`${comment.rating} estrellas`}
              >
                {"\u2605".repeat(comment.rating)}
              </div>
              <p>"{comment.text}"</p>
            </article>
          ))}
        </div>

        <button
          className={styles.uploadButton}
          onClick={openCommentModal}
          type="button"
        >
          Subir comentario
        </button>
      </section>

      {isCommentModalOpen && (
        <div className={styles.modalOverlay}>
          <form className={styles.commentModal} onSubmit={submitComment}>
            <button
              aria-label="Cerrar formulario"
              className={styles.closeModalButton}
              onClick={closeCommentModal}
              type="button"
            >
              x
            </button>

            <div className={styles.modalUser}>
              <img src={commentOneImage} alt="" aria-hidden="true" />
              <div>
                <span>Usuario conectado</span>
                <strong>mariana.tunki@example.com</strong>
              </div>
            </div>

            <div className={styles.modalCopy}>
              <p>Comparte tu momento Tunki</p>
              <h2>Deja tu comentario</h2>
            </div>

            <label className={styles.formField}>
              Comentario
              <textarea
                onChange={(event) =>
                  setCommentForm((currentForm) => ({
                    ...currentForm,
                    text: event.target.value,
                  }))
                }
                placeholder="Cuentanos que aroma, sabor o momento quieres compartir..."
                rows="5"
                value={commentForm.text}
              />
            </label>

            <fieldset className={styles.ratingField}>
              <legend>Valoración</legend>
              <div className={styles.ratingOptions}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating}>
                    <input
                      checked={commentForm.rating === String(rating)}
                      name="rating"
                      onChange={(event) =>
                        setCommentForm((currentForm) => ({
                          ...currentForm,
                          rating: event.target.value,
                        }))
                      }
                      type="radio"
                      value={rating}
                    />
                    <span>{rating}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {formMessage && <p className={styles.formMessage}>{formMessage}</p>}

            <button className={styles.submitCommentButton} type="submit">
              Publicar comentario
            </button>
          </form>
        </div>
      )}

      {isMomentModalOpen && (
        <div className={styles.modalOverlay}>
          <form className={styles.commentModal} onSubmit={submitMoment}>
            <button
              aria-label="Cerrar formulario"
              className={styles.closeModalButton}
              onClick={closeMomentModal}
              type="button"
            >
              x
            </button>

            <div className={styles.modalUser}>
              <img src={commentTwoImage} alt="" aria-hidden="true" />
              <div>
                <span>Usuario conectado</span>
                <strong>tunki.friend@example.com</strong>
              </div>
            </div>

            <div className={styles.modalCopy}>
              <p>Tu pausa también cuenta</p>
              <h2>Comparte tu momento</h2>
            </div>

            <label className={styles.formField}>
              Foto del momento
              <input type="file" accept="image/*" onChange={handleMomentImageChange} />
            </label>

            {momentForm.image && (
              <img
                className={styles.momentPreview}
                src={momentForm.image}
                alt="Vista previa del momento"
              />
            )}

            <label className={styles.formField}>
              Descripción
              <textarea
                onChange={(event) =>
                  setMomentForm((currentForm) => ({
                    ...currentForm,
                    description: event.target.value,
                  }))
                }
                placeholder="Describe dónde estás disfrutando tu café Tunki..."
                rows="4"
                value={momentForm.description}
              />
            </label>

            {formMessage && <p className={styles.formMessage}>{formMessage}</p>}

            <button className={styles.submitCommentButton} type="submit">
              Enviar momento
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
