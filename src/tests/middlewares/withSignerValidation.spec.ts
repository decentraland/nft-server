import { IHttpServerComponent } from "@well-known-components/interfaces"
import { withSignerValidation } from "../../middlewares/withSignerValidation"

let ctx: IHttpServerComponent.DefaultContext<any>

describe("withSignerValidation", () => {
  describe("when signer is decentraland-kernel-scene", () => {
    beforeEach(() => {
      ctx = {
        verification: {
          authMetadata: {
            signer: "decentraland-kernel-scene",
          },
        },
      }
    })

    it('should return 400 status and "Invalid signer" body', async () => {
      const next = jest.fn()
      const result = await withSignerValidation(ctx, next)
      expect(result).toEqual({
        status: 400,
        body: "Invalid signer",
      })
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe("when signer is not defined", () => {
    beforeEach(() => {
      ctx = {
        verification: {
          authMetadata: {},
        },
      }
    })

    it("should call next() and return its result", async () => {
      const nextResult = { status: 200, body: "Success" }
      const next = jest.fn().mockResolvedValue(nextResult)
      const result = await withSignerValidation(ctx, next)
      expect(result).toEqual(nextResult)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('when signer is not "decentraland-kernel-scene"', () => {
    beforeEach(() => {
      ctx = {
        verification: {
          authMetadata: { signer: "other-signer" },
        },
      }
    })

    it("should call next() and return its result", async () => {
      const nextResult = { status: 200, body: "Success" }
      const next = jest.fn().mockResolvedValue(nextResult)
      const result = await withSignerValidation(ctx, next)
      expect(result).toEqual(nextResult)
      expect(next).toHaveBeenCalled()
    })
  })
})
