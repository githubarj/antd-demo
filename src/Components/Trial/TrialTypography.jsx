import { Divider, Typography } from "antd";
import { useState } from "react";

function TrialTypography() {
  const { Paragraph, Text, Title } = Typography;

  const [innterText, setInnerText] = useState("This is editable text");
  const changeText = (str) => {
    setInnerText(str);
  };

  return (
    <div className="container">
      <Typography>
        <Title>Hello World</Title>
        <Title level={2}>Hello World</Title>
        <Title level={3}>Hello World</Title>
        <Title level={4}>Hello World</Title>
        <Paragraph>
          I am Richard Jeremy
          <Text strong>
            uniform the user interface specs for internal background projects,
            lower the unnecessary cost of design differences and implementation
            and liberate the resources of design and front-end development
          </Text>
          <Text code>Hello world I am javascript</Text>
        </Paragraph>
        <Divider />
        <Text strong>The following are interacrtive paragraphs and text</Text>
        <Paragraph copyable> Hello I am Richard</Paragraph>
        <Paragraph copyable={{ text: "Hello how are you" }} code>
          Copy our greeting
        </Paragraph>
        <Paragraph editable={{ onChange: changeText }}>{innterText}</Paragraph>
      </Typography>
    </div>
  );
}

export default TrialTypography;
