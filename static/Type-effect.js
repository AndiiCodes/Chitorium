  new TypeIt("#text-effect", {
      speed: 70,
      startDelay: 200,
    })
      .type("Let's find a player..", { delay: 1000 })
      .move(-2) 
      .delete(6, { deleteSpeed: 600 }) 
      .type("Cheater", { delay: 400 })
      .move(2)
      .go();