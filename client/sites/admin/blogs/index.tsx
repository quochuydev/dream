import React, { useState, useEffect } from "react";
import { Input, Form, Button } from "antd";

import ImageCrop from "./image-crop";

export default function ({ ...props }) {
  return (
    <div>
      <ImageCrop />
    </div>
  );
}
