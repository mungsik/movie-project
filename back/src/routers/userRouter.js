/**
 * @swagger
 * tags:
 *   name: Post
 *   description: 유저정보 처리
 * definitions:
 *   Post:
 *     type: "object"
 *     properties:
 *       name:
 *         type: "string"
 *       nickName:
 *         type: "string"
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     description: 유저 정보 등록
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/Post"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */
