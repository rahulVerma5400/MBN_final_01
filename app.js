const sideBar = document.querySelector('.mbn-section-one-sidebar');
const openSideBarBtn = document.querySelector('.mbn-section-one-header-toggle-button');
const closeSideBarBtn = document.querySelector('.mbn-section-one-sidebar-close-btn');
const intervalBtns = document.querySelectorAll('.mbn-section-two-services-clock-interval [data-position]');
const showCaseBtns = document.querySelectorAll('.mbn-section-one-showcase-btn');
const serviceModal= document.getElementById('mbn-service-modal');
const modalServiceList= document.querySelectorAll('.mbn-service-modal-content-service');
const modalCloseBtn= document.querySelector('.mbn-service-modal-close-btn');
const clockHandle = document.querySelector('.mbn-section-two-services-clock-handle');
const services = document.querySelectorAll('.mbn-section-two-service');
const serviceListSection = document.querySelector('.mbn-section-two-services-list');
const activeIntervalBtn = document.querySelector('.mbn-section-two-services-clock-interval .active');

const TRANSITION_TIME = 0.15;
const INTERVAL_DEGREES = {
  1: 60,
  2: 30,
  3: 0,
  4: -30,
  5: -60,
}


window.onload = setActiveServiceSectionHeightToParent;

window.onresize = setActiveServiceSectionHeightToParent;


openSideBarBtn.addEventListener('click', () => {
  sideBar.classList.add('mbn-section-one-sidebar-visible');
  document.body.classList.add('prevent-scroll');
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

closeSideBarBtn.addEventListener('click', () => {
  sideBar.classList.remove('mbn-section-one-sidebar-visible');
  document.body.classList.remove('prevent-scroll');
});

modalCloseBtn.addEventListener('click', () => {
  const servicesList= document.querySelectorAll('.mbn-service-modal-content-service');
  document.body.classList.remove('prevent-scroll');
  serviceModal.classList.remove('mbn-service-modal-show');
  Array.from(servicesList).forEach(modalServiceSection => modalServiceSection.classList.remove('mbn-service-modal-content-service-show'));
});


showCaseBtns.forEach((showCaseBtn) => {
  showCaseBtn.addEventListener('click', () => {
    const serviceName = showCaseBtn.dataset.service;
    const modalServiceSection = Array.from(modalServiceList).find(modalService => modalService.dataset.name === serviceName);

    if (modalServiceSection) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.classList.add('prevent-scroll');
      serviceModal.classList.add('mbn-service-modal-show');
      modalServiceSection.classList.add('mbn-service-modal-content-service-show');
    };

  });
});

intervalBtns.forEach((intervalBtn) => {
  intervalBtn.addEventListener('click', () => {
    const curActiveIntervalBtn = document.querySelector(
      '.mbn-section-two-services-clock-interval .active',
    );

    if (intervalBtn.isEqualNode(curActiveIntervalBtn)) return;

    const activeServiceSection = document.querySelector(
      '.mbn-section-two-service-show',
    );
    const targetServiceSection = document.querySelector(
      `.mbn-section-two-service-${intervalBtn.dataset.serviceName}`,
    );

    const targetIntervalPosition = parseInt(intervalBtn.dataset.position, 10);
    const activeIntervalPosition = parseInt(curActiveIntervalBtn.dataset.position, 10);

    const degreeRotation = INTERVAL_DEGREES[targetIntervalPosition];
    const transitionTime = TRANSITION_TIME * Math.abs(activeIntervalPosition - targetIntervalPosition);

    clockHandle.style.transform = `translateY(-50%) rotate(${degreeRotation}deg)`;
    clockHandle.style.transitionDuration = `${transitionTime}s`;
    targetServiceSection.style.transitionDuration = `${transitionTime}s`;
    activeServiceSection.style.transitionDuration = `0s`;

    curActiveIntervalBtn.classList.remove('active');
    intervalBtn.classList.add('active');

    activeServiceSection.classList.remove('mbn-section-two-service-show');
    targetServiceSection.classList.add('mbn-section-two-service-show');
    setServiceListSectionHeight(targetServiceSection?.offsetHeight);
  });
});


function setActiveServiceSectionHeightToParent () {
  const activeSection =  document.querySelector('#mbn-section-two .mbn-section-two-service.mbn-section-two-service-show');
  setServiceListSectionHeight(activeSection?.offsetHeight);
}


function setServiceListSectionHeight(height)  {
  serviceListSection.style.height = `${height}px`;
};
