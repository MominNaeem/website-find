import svgPaths from "./svg-rriy3mbogg";

function Thrive() {
  return (
    <div className="absolute h-[38.022px] left-0 top-[20.54px] w-[159.225px]" data-name="thrive">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 159.225 38.0223">
        <g id="thrive">
          <path d={svgPaths.p174b3000} fill="var(--fill-0, #C4E86B)" id="Vector" />
          <path d={svgPaths.p1054f180} fill="var(--fill-0, #C4E86B)" id="Vector_2" />
          <path d={svgPaths.p30ff6ec0} fill="var(--fill-0, #C4E86B)" id="Vector_3" />
          <path d={svgPaths.p338a1e00} fill="var(--fill-0, #C4E86B)" id="Vector_4" />
          <path d={svgPaths.p7c2be00} fill="var(--fill-0, #C4E86B)" id="Vector_5" />
          <path d={svgPaths.p941ac80} fill="var(--fill-0, #C4E86B)" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[20.54px]">
      <Thrive />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-[20.54px]">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group1 />
      <div className="absolute h-[9.614px] left-[84.12px] top-[22.23px] w-[17.425px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Rectangle 33" />
        </svg>
      </div>
      <div className="absolute flex h-[32.461px] items-center justify-center left-[57.08px] top-0 w-[70.935px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[179.46deg]">
          <div className="h-[31.799px] relative w-[70.64px]" data-name="Intersect">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70.6396 31.7988">
              <path d={svgPaths.pa113b00} fill="var(--fill-0, #C4E86B)" id="Intersect" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Logo() {
  return (
    <div className="relative size-full" data-name="Logo">
      <Group2 />
    </div>
  );
}