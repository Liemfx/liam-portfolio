const MouseGlow = document.getElementById("MouseGlow");

// Make mouse glow follow mouse
window.addEventListener("mousemove", (event) => {
  MouseGlow.animate(
    { left: `${event.clientX}px`, top: `${event.clientY}px` },
    { duration: 0, fill: "forwards" }
  );
});

// Scrollspy logic // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

const RightPanel = document.getElementById("RightPanel");
const NavItems = document.querySelectorAll(".NavItem");
const Sections = document.querySelectorAll(".Section");

// Function to detect which section user is scrolled to currently
function SetActiveSection() {
  let Index = Sections.length;
  while (--Index && RightPanel.scrollTop + 150 < Sections[Index].offsetTop) {}
  NavItems.forEach((item) => item.classList.remove("Active"));
  NavItems[Index].classList.add("Active");
}

// Function to scroll to selected section when scroll spy clicked
function ScrollToSection(event) {
  const SectionId = event.currentTarget.getAttribute("DataSection");
  const TargetSection = document.getElementById(SectionId);
  RightPanel.scrollTo({
    top: TargetSection.offsetTop - window.innerHeight * 0.1,
    behavior: "smooth",
  });
}

NavItems.forEach((item) => item.addEventListener("click", ScrollToSection));
RightPanel.addEventListener("scroll", SetActiveSection);
SetActiveSection();

// Projects list logic // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

const Projects = document.querySelectorAll(".Project");
const Letters = "abcdefghijklmnopqrstuvwxyz0123456789";

// For every project item
Projects.forEach((Project) => {
  // When mouse enters item
  Project.addEventListener("mouseenter", (event) => {
    // For every text object in item
    event.target.querySelectorAll("p").forEach((Text) => {
      let Iteration = 0;
      const originalText = Text.dataset.value;

      if (!originalText) return; // Skip if data-value is not set

      let Interval = setInterval(() => {
        // Split text into its letters
        Text.innerText = originalText
          .split("")
          // Assign each letter a new value
          .map((letter, index) => {
            // Return original letter
            if (index < Iteration || originalText[index] == " ") {
              return originalText[index];
            }

            // Return random letter
            return Letters[Math.floor(Math.random() * Letters.length)];
          })
          .join(""); // Join the word back together from the letters

        if (Iteration >= originalText.length) {
          clearInterval(Interval);
        }

        Iteration += 1 / 3;
      }, 30);
    });
  });
});
