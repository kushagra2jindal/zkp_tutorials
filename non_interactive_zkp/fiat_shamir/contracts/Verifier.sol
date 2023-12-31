// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Secp256k1.sol";

contract Verifier {

    Secp256k1 secp256k1;

    constructor(address _secp256k1) {
        secp256k1 = Secp256k1(_secp256k1);
    }

    function verify(
        uint256 a1x, 
        uint256 a1y, 
        uint256 a2x, 
        uint256 a2y,
        uint256 vGx, 
        uint256 vGy
    ) public view returns(bool) {

        require(secp256k1.onCurve(a1x, a1y), "Point 1 invalid!!");
        require(secp256k1.onCurve(a2x, a2y), "Point 2 invalid!!");

        (uint256 Vcheckx, uint256 Vchecky) = secp256k1.add(a1x, a1y, a2x, a2y);
        
        require(vGx == Vcheckx, "X coordinate not matching!!!");
        require(vGy == Vchecky, "X coordinate not matching!!!");

        // emit KjLog(msg.sender, Vcheckx, Vchecky, vGx, vGy, a1x, a1y, a2x, a2y);

        return true;
    }

}