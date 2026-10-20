const sections = document.querySelectorAll("section");
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
    });
}, {
    threshold: .15
});
sections.forEach(s => obs.observe(s));