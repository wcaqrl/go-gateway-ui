import React from 'react';
import RCToolTip from 'rc-tooltip';
import { PopWrapper } from './style';
import 'rc-tooltip/assets/bootstrap_white.css';
import * as JSX from "react";
import Divider from "../divider";

const PopContainer: React.FC<{
    title?: string;
    desc?: string;
    onCancel?: React.MouseEventHandler;
    onConfirm?: React.MouseEventHandler;
    cancelText?: string;
    confirmText?: string;
}> = ({ title, desc, onCancel, onConfirm, cancelText, confirmText }) => {
    return (
        <PopWrapper>
            <span >{title}</span>
            <span >{desc}</span>
            <Divider direction='horizontal' />
            <div>
                <button onClick={onCancel}>{cancelText}</button>
                <button onClick={onConfirm}>{confirmText}</button>
            </div>
        </PopWrapper>
    );
};

const PopConfirm: React.FC<{
    children?: JSX.Element;
    title?: string;
    desc?: string;
    trigger?: string[];
    placement?: string;
    onCancel?: React.MouseEventHandler;
    onConfirm?: React.MouseEventHandler;
    cancelText?: string;
    confirmText?: string;
}> = props => {
    if (!props.children) {
        return null;
    }

    return (
        <RCToolTip
            trigger={props.trigger}
            placement={props.placement}
            overlay={<PopContainer {...props} />}
        >
            <div>{props.children}</div>
        </RCToolTip>
    );
};

export default PopConfirm;
