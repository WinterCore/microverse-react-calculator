import React from 'react';
import Button from './Button';
import './ButtonPanel.css';

const ButtonPanel = () => (
  <div className="button-panel">
    <div>
      <Button color="#E0E0E0" name="AC" />
      <Button color="#E0E0E0" name="+/-" />
      <Button color="#E0E0E0" name="%" />
      <Button name="÷" />
    </div>
    <div>
      <Button color="#E0E0E0" name="7" />
      <Button color="#E0E0E0" name="9" />
      <Button color="#E0E0E0" name="8" />
      <Button name="X" />
    </div>
    <div>
      <Button color="#E0E0E0" name="4" />
      <Button color="#E0E0E0" name="5" />
      <Button color="#E0E0E0" name="6" />
      <Button name="-" />
    </div>
    <div>
      <Button color="#E0E0E0" name="1" />
      <Button color="#E0E0E0" name="2" />
      <Button color="#E0E0E0" name="3" />
      <Button name="+" />
    </div>
    <div>
      <Button color="#E0E0E0" name="0" wide />
      <Button color="#E0E0E0" name="." />
      <Button name="=" />
    </div>
  </div>
);

export default ButtonPanel;
