const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  // backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

app.loader
  .add("spineboy", "client/Ape.json")
  .add("background", "client/Ape_images/backgrounds/3a.jpg")
  .add("leftContainerBg", "client/bg-content-left.png")
  .add("rightContainerBg", "client/bg-content-right.png")
  .add("characterIconLeft", "client/Ape_images/Attack13/Body.png")
  .add("characterIconRight", "client/Ape_images/Attack13/Body.png")
  .load((loader, resources) => {
    const spineBoy = new PIXI.spine.Spine(resources.spineboy.spineData);

    // Create a sprite from the background image
    const background = new PIXI.Sprite(resources.background.texture);

    // Set the position and scale of the background sprite
    background.x = 0;
    background.y = 0;
    background.width = app.screen.width;
    background.height = app.screen.height;

    spineBoy.x = app.screen.width / 2;
    spineBoy.y = app.screen.height;
    spineBoy.scale.set(0.5);

    // Add the background sprite to the stage first to ensure it's at the back
    app.stage.addChildAt(background, 0);

    // Function to create a data container
    function createDataContainer(
      name,
      level,
      score,
      maxScore,
      bgTexture,
      characterTexture,
      characterPosition
    ) {
      const container = new PIXI.Container();

      // Add background image
      const containerBg = new PIXI.Sprite(bgTexture);
      containerBg.width = 300; // Adjust width as needed
      containerBg.height = 55; // Adjust height as needed
      container.addChild(containerBg);

      // Add character icon
      const characterIcon = new PIXI.Sprite(characterTexture);
      characterIcon.width = 50;
      characterIcon.height = 50;
      characterIcon.x =
        characterPosition === "left" ? 25 : containerBg.width - 75;
      characterIcon.y = containerBg.height - 55; // Adjust the y position to add margin from the bottom
      container.addChild(characterIcon);

      // Add level and name text
      const textStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 16,
        fill: "WHITE",
      });

      const levelText = new PIXI.Text(`Lvl ${level}    ${name}`, textStyle);
      levelText.x = characterPosition === "left" ? 110 : 30;
      levelText.y = 0;
      container.addChild(levelText);

      // Add score text
      const scoreText = new PIXI.Text(`${score} / ${maxScore}`, textStyle);
      scoreText.x = characterPosition === "left" ? 110 : 20;
      scoreText.y = 40;
      container.addChild(scoreText);

      return container;
    }

    // Create and position data containers
    const data = [
      {
        name: "THOMAS",
        level: 295,
        score: "17,582,444",
        maxScore: "17,852,545",
      },
      {
        name: "THOMAS",
        level: 295,
        score: "17,582,444",
        maxScore: "17,852,545",
      },
      {
        name: "THOMAS",
        level: 295,
        score: "17,582,444",
        maxScore: "17,852,545",
      },
      {
        name: "THOMAS",
        level: 295,
        score: "17,582,444",
        maxScore: "17,852,545",
      },
      {
        name: "THOMAS",
        level: 295,
        score: "17,582,444",
        maxScore: "17,852,545",
      },
    ];

    data.forEach((d, index) => {
      const leftContainer = createDataContainer(
        d.name,
        d.level,
        d.score,
        d.maxScore,
        resources.leftContainerBg.texture,
        resources.characterIconLeft.texture,
        "left"
      );
      leftContainer.x = 20;
      leftContainer.y = 100 + index * 100;
      app.stage.addChild(leftContainer);

      const rightContainer = createDataContainer(
        d.name,
        d.level,
        d.score,
        d.maxScore,
        resources.rightContainerBg.texture,
        resources.characterIconRight.texture,
        "right"
      );
      rightContainer.x = app.screen.width - 320;
      rightContainer.y = 100 + index * 100;
      app.stage.addChild(rightContainer);
    });

    app.stage.addChild(spineBoy);

    // Function to change animation
    function changeAnimation(animationName) {
      if (spineBoy) {
        // Clear previous animations
        spineBoy.state.setEmptyAnimation(0, 0); // Ensure the previous animation is fully cleared

        // Set the new animation
        spineBoy.state.setAnimation(0, animationName, true);
      }
    }

    // Add event listener for keyboard input
    document.addEventListener("keydown", (event) => {
      console.log(event.key);
      switch (event.key) {
        case "1":
          changeAnimation("Attack_1");
          break;
        case "2":
          changeAnimation("Attack_2");
          break;
        case "3":
          changeAnimation("Attack_3");
          break;
        case "4":
          changeAnimation("Attack_4");
          break;
        case "5":
          changeAnimation("Attack_5");
          break;
        case "6":
          changeAnimation("Attack_6");
          break;
      }
    });

    app.ticker.add(() => {
      spineBoy.update(0.0000016); // 60fps update
    });
  });
