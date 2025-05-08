<template>
    <section class="reassurance">
        <h3>Pourquoi nous faire confiance ?</h3>
        <div class="reassurance-items">
          <div class="reassurance-item">
            <div class="icon">🔒</div>
            <h4>Paiement sécurisé</h4>
            <p>Le paiement est traité via Stripe, leader mondial du paiement en ligne. Aucune donnée bancaire n’est stockée chez nous.</p>
          </div>
          <div class="reassurance-item">
            <div class="icon">💬</div>
            <h4>Support réactif</h4>
            <p>Une question ? Une équipe est disponible sur Discord pour vous aider rapidement.</p>
          </div>
          <div class="reassurance-item">
            <div class="icon">✅</div>
            <h4>Accès immédiat</h4>
            <p>Vos avantages sont activés automatiquement dès que le paiement est validé.</p>
          </div>
        </div>
      </section>
</template>

<style scoped>
.reassurance {
  margin: 6vh auto;
  padding: 2rem;
  text-align: center;
  background: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.reassurance h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #212121;
}

.reassurance-items {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
}

.reassurance-item {
  flex: 1 1 250px;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.reassurance-item:hover {
  transform: translateY(-5px);
}

.reassurance-item .icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.reassurance-item h4 {
  font-size: 1.1rem;
  color: #FF9800;
  margin-bottom: 0.5rem;
}

.reassurance-item p {
  font-size: 0.95rem;
  color: #555;
}
</style>