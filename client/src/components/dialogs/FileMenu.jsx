import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorEl}) => {
    return (
      <Menu anchorEl={anchorEl} open={false} >
            <div style={{
            width: "10rem",
            }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid optio nulla repudiandae nam eveniet neque iusto quam earum facere asperiores?
        </div>
      </Menu>
    );
}

export default FileMenu
