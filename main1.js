document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".project-card");

  function revealProjects() {
    projects.forEach((project) => {
      const projectTop = project.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (projectTop < windowHeight - 100) {
        project.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealProjects);
  revealProjects();
});

document.addEventListener("DOMContentLoaded", function () {
  const skills = document.querySelectorAll(".skills");

  function revealSkills() {
    skills.forEach((skill) => {
      const skillTop = skill.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (skillTop < windowHeight - 100) {
        skill.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealSkills);
  revealSkills();
});
// ✅ كود الأنيميشن للفورم عند الظهور في الشاشة
document.addEventListener("DOMContentLoaded", function () {
  let contactSection = document.getElementById("contact");
  let contactForm = document.getElementById("contact-form"); // ✅ تعديل الـ ID
  let inputs = document.querySelectorAll(
    "#contact-form input, #contact-form textarea"
  );

  function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }

  function handleScroll() {
    if (isInViewport(contactSection)) {
      contactSection.style.opacity = "1";
      contactSection.style.transform = "translateY(0)";
      window.removeEventListener("scroll", handleScroll);
    }
  }

  contactSection.style.opacity = "0";
  contactSection.style.transform = "translateY(50px)";
  contactSection.style.transition =
    "opacity 0.8s ease-out, transform 0.8s ease-out";
  window.addEventListener("scroll", handleScroll);

  // ✅ حفظ بيانات الفورم عند الكتابة
  inputs.forEach((input) => {
    let storedValue = sessionStorage.getItem(input.id);
    if (storedValue) {
      input.value = storedValue;
    }

    input.addEventListener("input", function () {
      sessionStorage.setItem(input.id, input.value);
    });
  });

  // ✅ إرسال البيانات إلى واتساب مباشرةً
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let subject = document.getElementById("subject").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let message = document.getElementById("message").value.trim();

      if (
        name === "" ||
        email === "" ||
        subject === "" ||
        phone === "" ||
        message === ""
      ) {
        alert("⚠️ من فضلك املأ جميع الحقول.");
        return;
      }

      let whatsappMessage = `👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n📞 *Phone:* ${phone}\n💬 *Message:* ${message}`;

      let phoneNumber = "201061062466";
      let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      window.open(whatsappURL, "_blank");
      window.sessionStorage.clear();
    });
  } else {
    console.error("❌ عنصر contact-form غير موجود في الصفحة.");
  }
});
