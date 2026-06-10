import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaGift, FaMugHot, FaStar } from "react-icons/fa";
import styles from "./PremiosTunki.module.css";
import cafeBag from "../assets/home/bolsa-cafe.png";
import cafeCup from "../assets/home/tasa.png";
import cafeHero from "../assets/cafe/cafe.png";
import { useAuth } from "../hooks/useAuth.js";
import {
  createRewardRedemption,
  getUserRewardSummary,
  rewardTiers,
} from "../services/rewards.js";
import { downloadRewardPDF } from "../services/pdf.js";

const rewardIcons = [<FaMugHot />, <FaGift />, <FaStar />];

export default function PremiosTunki() {
  const { user } = useAuth();
  const [redemptions, setRedemptions] = useState(() => {
    if (!user) {
      return [];
    }

    const savedRedemptions = localStorage.getItem(
      `tunkiRewardRedemptions:${user.id}`
    );
    return savedRedemptions ? JSON.parse(savedRedemptions) : [];
  });
  const [redemptionMessage, setRedemptionMessage] = useState("");
  const orders = useMemo(() => {
    if (!user) {
      return [];
    }

    const savedOrders = localStorage.getItem(`tunkiOrders:${user.id}`);
    return savedOrders ? JSON.parse(savedOrders) : [];
  }, [user]);
  const rewardSummary = useMemo(
    () => getUserRewardSummary(orders, redemptions),
    [orders, redemptions]
  );

  const redeemReward = (reward) => {
    if (!user) {
      setRedemptionMessage("Inicia sesión para canjear tus premios.");
      return;
    }

    if (rewardSummary.availablePoints < reward.pointsRequired) {
      setRedemptionMessage(
        `Aun te faltan ${reward.pointsRequired - rewardSummary.availablePoints} pts.`
      );
      return;
    }

    const redemption = createRewardRedemption(reward, user);
    const nextRedemptions = [redemption, ...redemptions];

    localStorage.setItem(
      `tunkiRewardRedemptions:${user.id}`,
      JSON.stringify(nextRedemptions)
    );
    setRedemptions(nextRedemptions);
    setRedemptionMessage(
      `${reward.title} canjeado. Se descargó tu cupón en PDF.`
    );
    downloadRewardPDF(redemption, user);
  };

  return (
    <section className={styles.rewardsPage}>
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <span>Tunki Amigo</span>
          <h1>Premios exclusivos por cada compra</h1>
          <p>
            Acumula puntos con tus compras de café Tunki y canjéalos por
            experiencias, productos especiales y beneficios creados para la
            comunidad.
          </p>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <img className={styles.coffeeBag} src={cafeBag} alt="" />
          <img className={styles.coffeeBean} src={cafeHero} alt="" />
          <img className={styles.coffeeCup} src={cafeCup} alt="" />
        </div>
      </div>

      <div className={styles.pointsPanel}>
        <div>
          <span>Como funciona</span>
          <h2>Compra, acumula y canjea</h2>
        </div>
        <p>
          Ganas 1 punto Tunki por cada S/ 1.00 de compra. Cuando llegas a una
          meta, desbloqueas premios exclusivos para coordinar tu canje.
        </p>
      </div>

      <div className={styles.walletPanel}>
        <div>
          <span>Tu saldo Tunki</span>
          <strong>{rewardSummary.availablePoints} pts</strong>
          <p>
            {user
              ? rewardSummary.pointsToNext === 0
                ? "Ya tienes premios disponibles. Elige uno y coordina tu canje."
                : `Te faltan ${rewardSummary.pointsToNext} pts para ${rewardSummary.nextReward.title}.`
              : "Inicia sesión para ver tus puntos y premios disponibles."}
          </p>
          {user && (
            <small>
              {rewardSummary.totalPoints} pts ganados - {rewardSummary.redeemedPoints} pts canjeados
            </small>
          )}
        </div>
        <div className={styles.walletProgress} aria-hidden="true">
          <span style={{ width: `${rewardSummary.progress}%` }} />
        </div>
        {!user && (
          <Link className={styles.loginLink} to="/login">
            Iniciar sesión
          </Link>
        )}
      </div>

      {redemptionMessage && (
        <p className={styles.redemptionMessage}>{redemptionMessage}</p>
      )}

      <div className={styles.rewardGrid}>
        {rewardTiers.map((reward, index) => {
          const isUnlocked =
            rewardSummary.availablePoints >= reward.pointsRequired;
          const pointsLeft = Math.max(
            0,
            reward.pointsRequired - rewardSummary.availablePoints
          );

          return (
            <article
              className={`${styles.rewardCard} ${
                isUnlocked ? styles.unlockedReward : ""
              }`}
              key={reward.title}
            >
              <div className={styles.rewardIcon}>{rewardIcons[index]}</div>
              <span>{reward.pointsRequired} pts</span>
              <h3>{reward.title}</h3>
              <p>{reward.description}</p>
              <strong className={styles.rewardStatus}>
                {isUnlocked ? "Disponible" : `Faltan ${pointsLeft} pts`}
              </strong>
              <button
                className={styles.redeemButton}
                type="button"
                disabled={!isUnlocked}
                onClick={() => redeemReward(reward)}
              >
                Canjear premio
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
