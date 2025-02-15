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
