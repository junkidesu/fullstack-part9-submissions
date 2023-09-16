interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface HeaderProps {
  name: string;
}

interface PartProps {
  part: CoursePart;
}

interface ContentProps {
  parts: CoursePart[];
}

interface TotalProps {
  total: number;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const { part } = props;

  const partHeader: JSX.Element = (
    <div>
      <strong>
        {props.part.name} {props.part.exerciseCount}
      </strong>
    </div>
  );

  const style: React.CSSProperties = {
    marginBottom: "15px",
  };

  switch (part.kind) {
    case "basic":
      return (
        <div style={style}>
          {partHeader}
          <div><i>{part.description}</i></div>
        </div>
      );
    case "background":
      return (
        <div style={style}>
          {partHeader}
          <div><i>{part.description}</i></div>
          <div>{part.backgroundMaterial}</div>
        </div>
      );
    case "group":
      return (
        <div style={style}>
          {partHeader}
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case "special":
      return (
        <div style={style}>
          {partHeader}
          <div><i>{part.description}</i></div>
          <div>required skils: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Header = (props: HeaderProps) => <h1>{props.name}</h1>;

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />

      <Content parts={courseParts} />

      <Total total={total} />
    </div>
  );
};

export default App;
